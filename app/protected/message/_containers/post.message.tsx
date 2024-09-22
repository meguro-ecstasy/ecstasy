'use client';

import { PostMessageComponent } from '../_components';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof PostMessageComponent>;

export const PostMessage = ({ questionId, userId }: Props) => {
  // NOTE: 現場はcomponent内に色々ロジック書いてるのでこのContainerの存在価値ない
  return <PostMessageComponent questionId={questionId} userId={userId} />;
};
