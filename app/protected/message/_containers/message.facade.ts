import { createClient } from '@/utils/supabase/client';
import { Database, Tables } from '@/utils/supabase/type';
import { useEffect, useState } from 'react';

type Props = {
  questionId: number;
};

export const useMessageFacade = ({ questionId }: Props) => {
  const supabase = createClient();

  const [userId, setUserId] = useState<string>('');
  const [messages, setMessages] = useState<Tables<'messages'>[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
      }
    });

    // 初期データの取得
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('question_id', questionId);
      if (data) {
        setMessages(data);
      }
    };

    fetchMessages();

    // リアルタイムサブスクリプションの設定
    const subscription = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `question_id=eq.${questionId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages((prevMessages) => [
              ...prevMessages,
              payload.new as Tables<'messages'>,
            ]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
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
  }, [questionId]);

  return { messages, userId } as const;
};
