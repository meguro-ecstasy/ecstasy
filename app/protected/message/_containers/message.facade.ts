import { createClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/type';
import { useEffect, useState } from 'react';

type Props = {
  questionId: number;
};

export const useMessageFacade = ({ questionId }: Props) => {
  const supabase = createClient();

  const [userId, setUserId] = useState<string>('');
  const [messages, setMessages] = useState<
    Database['public']['Tables']['messages']['Row'][]
  >([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
      }
    });

    supabase
      .from('messages')
      .select('*')
      .eq('question_id', questionId)
      .then(({ data }) => {
        if (data) {
          setMessages(data);
        }
      });
  }, []);

  return { messages, userId } as const;
};
