import GetQuestion from './_components';
import { createClient } from '@/utils/supabase/server';

export default async function GetQuestionPage() {
  const supabase = createClient();
  const questions = (await supabase.from('questions').select('*')).data;
  // @ts-ignore
  return <GetQuestion questions={questions}></GetQuestion>;
}
