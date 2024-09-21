import { notFound } from 'next/navigation';
import GetQuestion from './_components';
import { createClient } from '@/utils/supabase/server';
import { QueryData } from '@supabase/supabase-js';

export default async function GetQuestionPage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user?.id) {
    return notFound();
  }

  const tag = await (
    await supabase
      .from('users')
      .select('tags!user_tags(*)')
      .eq('id', user.user?.id)
      .single()
  ).data?.tags;

  if (!tag) {
    return notFound();
  }

  const questions = (
    await supabase
      .from('questions')
      .select('*, users(*)')
      .eq('tagId', tag[0].id)
  ).data;

  // @ts-ignore
  return <GetQuestion questions={questions} tag={tag[0].name}></GetQuestion>;
}
