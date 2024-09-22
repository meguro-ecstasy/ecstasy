import { notFound } from 'next/navigation';
import GetQuestion from './_components';
import { createClient } from '@/utils/supabase/server';

export default async function GetQuestionPage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user?.id) {
    return notFound();
  }

  const { data } = await supabase
    .from('users')
    .select('tags(*)')
    .eq('id', user.user.id)
    .single();
  const tag = data?.tags;

  if (!tag) {
    return notFound();
  }

  // もらった質問
  const questions = (
    await supabase.from('questions').select('*, users(*)').eq('tagId', tag.id)
  ).data;

  // 自分がした質問が取れる
  const { data: askedQuestions } = await supabase
    .from('questions')
    .select('* users(*)')
    .eq('userId', user.user.id);

  return (
    <GetQuestion
      // @ts-ignore
      questions={questions}
      tag={tag.name}
      // @ts-ignore
      askedQuestions={askedQuestions}
    ></GetQuestion>
  );
}
