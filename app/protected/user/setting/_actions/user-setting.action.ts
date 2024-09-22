'use server';

import { createClient } from '@/utils/supabase/server';
import { parseWithZod } from '@conform-to/zod';
import { userSettingSchema } from '../_models';
import { redirect } from 'next/navigation';

export const postUserSetting = async (
  prevState: unknown,
  formData: FormData,
) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/sign-in');
  }

  const submission = parseWithZod(formData, {
    schema: userSettingSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await supabase.from('users').upsert({
    id: user.id,
    email: user.email!,
    name: submission.value.name,
    tag_id: Number(submission.value?.value),
  });

  return submission.reply({ resetForm: false });
};
