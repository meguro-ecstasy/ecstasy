'use client';

import { useMessageFacade } from './message.facade';
import { MessageListComponent } from '../_components';
import { ComponentProps } from 'react';

type Props = Parameters<typeof useMessageFacade>[0] &
  Pick<ComponentProps<typeof MessageListComponent>, 'userId'>;

export const MessageContainer = ({ questionId, userId }: Props) => {
  const { messages } = useMessageFacade({ questionId });

  return <MessageListComponent messages={messages} userId={userId} />;
};
