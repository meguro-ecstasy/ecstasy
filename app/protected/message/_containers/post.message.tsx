'use client';

import { useMessageFacade } from './message.facade';
import { PostMessageComponent } from '../_components';

type Props = Parameters<typeof useMessageFacade>[0];

export const PostMessage = ({ questionId }: Props) => {
  const { userId } = useMessageFacade({ questionId });

  return <PostMessageComponent questionId={questionId} userId={userId} />;
};
