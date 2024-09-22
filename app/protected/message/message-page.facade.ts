import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export const useMessagePageFacade = () => {
  const supabase = createClient();

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
      }
    });
  }, [supabase.auth]);

  return { userId } as const;
};
