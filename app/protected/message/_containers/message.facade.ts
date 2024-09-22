import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/utils/supabase/type';
import { useEffect, useState } from 'react';

type Props = {
  questionId: number;
};

export const useMessageFacade = ({ questionId }: Props) => {
  const supabase = createClient();

  const [messages, setMessages] = useState<Tables<'messages'>[]>([]);

  // 初期データの取得
  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .eq('question_id', questionId)
      .then(({ data }) => {
        if (data) {
          setMessages(data);
        }
      });
  }, [questionId, supabase]);

  // リアルタイムサブスクリプションの設定
  useEffect(() => {
    const channels = supabase.channel('messages_changes');
    const subscription = channels
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `question_id=eq.${questionId}`,
        },
        (payload) => {
          console.log(payload);
          if (payload.eventType === 'INSERT') {
            setMessages((prev) => [...prev, payload.new as Tables<'messages'>]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === payload.new.id
                  ? (payload.new as Tables<'messages'>)
                  : message,
              ),
            );
          } else if (payload.eventType === 'DELETE') {
            setMessages((prevMessages) =>
              prevMessages.filter((message) => message.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    // クリーンアップ関数
    return () => {
      subscription.unsubscribe();
    };
  }, [questionId, supabase]);

  return { messages } as const;
};
