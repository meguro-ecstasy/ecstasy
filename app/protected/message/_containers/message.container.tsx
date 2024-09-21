'use client';

import { useMessageFacade } from './message.facade';
import { MessageListComponent } from '../_components';

type Props = Parameters<typeof useMessageFacade>[0];

export const MessageContainer = ({ questionId }: Props) => {
  const { messages, userId } = useMessageFacade({ questionId });

  return <MessageListComponent messages={messages} userId={userId} />;
};
