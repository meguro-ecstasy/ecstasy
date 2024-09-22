// 'use client';

import { PostMessage, MessageContainer } from './_containers';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

const MessagePage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return notFound();
  }

  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (!userId) {
    return notFound();
  }
  const { data: question } = await supabase
    .from('questions')
    .select('content')
    .eq('id', params.id)
    .limit(1)
    .single();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">{question?.content}</h1>
      <div className="h-5"></div>
      <MessageContainer
        key={params.id}
        questionId={Number(params.id)}
        userId={userId}
      />
      <PostMessage questionId={Number(params.id)} userId={userId} />
    </div>
  );
};

export default MessagePage;
