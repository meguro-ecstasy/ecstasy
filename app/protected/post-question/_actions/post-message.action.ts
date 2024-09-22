'use server';

import { createClient } from '@/utils/supabase/server';
import { parseWithZod } from '@conform-to/zod';
import { postMessageSchema } from '../_models';
import { redirect } from 'next/navigation';

export const postMessageAction = async (
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
    schema: postMessageSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await supabase.from('questions').insert({
    userId: user.id,
    tagId: submission.value.tagId,
    content: submission.value.content,
  });

  // フォームをリセットする
  submission.reply({ resetForm: true });

  redirect("/protected/get-question")
};
