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

  return (
    <div>
      <h1 className="text-center text-2xl">
        不明点について概要を記入して分野のタグを選択してね！
      </h1>
      <div className="h-10"></div>
      <PostMessageFormComponent options={options} />
    </div>
  );
};

export default PostMessagePage;
