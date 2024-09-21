import { createClient } from '@/utils/supabase/server';
import { PostMessageFormComponent } from './_components';
import { notFound } from 'next/navigation';

const PostMessagePage = async () => {
  const supabase = createClient();
  const options = await (
    await supabase.from('tags').select('*')
  ).data?.map((t) => ({ label: t.name, value: t.id.toString() }));

  if (!options) {
    return notFound();
  }

  return <PostMessageFormComponent options={options} />;
};

export default PostMessagePage;
