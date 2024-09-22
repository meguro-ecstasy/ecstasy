import { useCallback } from 'react';

type Props = {
  userId: string;
};

export const useMessagePresenter = ({ userId }: Props) => {
  const isSenderUser = useCallback(
    (messageAuthor: string) => messageAuthor === userId,
    [userId],
  );

  return {
    isSenderUser,
  } as const;
};
