'use server';

import { createClient } from '@/utils/supabase/server';
import { Form } from './_components/form';
import { notFound } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();
  const { data: d } = await await supabase.from('tags').select('*');
  const options = d?.map((t) => ({ label: t.name, value: t.id.toString() }));
  const user = await supabase.auth.getUser();

  if (!user.data.user?.id) {
    return notFound();
  }

  const { data } = await supabase
    .from('users')
    .select('tags(*)')
    .eq('id', user.data.user?.id)
    .single();
  const tag = data?.tags;

  if (!options) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="flex text-2xl">
        得意な分野を設定して、困ってる人を助けてあげよう！
      </h1>
      <Form options={options} defaultValue={tag ? tag.id.toString() : null} />
    </div>
  );
}
