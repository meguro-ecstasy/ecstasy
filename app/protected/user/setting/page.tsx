'use server';

import { createClient } from '@/utils/supabase/server';
import { Form } from './_components/form';
import { notFound } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();
  const options = await supabase
    .from('tags')
    .select('*')
    .data?.map((t) => ({ label: t.name, value: t.id.toString() }));
  const user = await supabase.auth.getUser();

  const {
    data: { tags },
  } = await supabase
    .from('users')
    .select('*, tags!user_tags(*)')
    .eq('id', user.data.user?.id)
    .single();

  if (!options) {
    return notFound();
  }

  return <Form options={options} defaultValue={tags[0]?.id} />;
}
