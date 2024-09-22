'use server';

import { createClient } from '@/utils/supabase/server';
import { Form } from './_components/form';
import { notFound } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();
  const { data: d, error: e } = await await supabase.from('tags').select('*');
  const options = d?.map((t) => ({ label: t.name, value: t.id.toString() }));
  const user = await supabase.auth.getUser();

  if (!user.data.user?.id) {
    return notFound();
  }

  const { data, error: _ } = await supabase
    .from('users')
    .select('tags!user_tags(*)')
    .eq('id', user.data.user?.id)
    .single();
  const tag = data;

  if (!options) {
    return notFound();
  }

  return (
    <Form
      options={options}
      defaultValue={tag?.tags ? tag.tags[0]?.id.toString() : null}
    />
  );
}
