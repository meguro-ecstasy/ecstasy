'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { postMessageAction } from '../../_actions';
import {
  getFormProps,
  useForm,
  getInputProps,
  getTextareaProps,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { postMessageSchema, PostMessageSchema } from '../../_models';

export const PostMessageFormComponent = () => {
  const [lastResult, action] = useFormState(postMessageAction, undefined);
  const [form, fields] = useForm<PostMessageSchema>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postMessageSchema });
    },
    defaultValue: {
      tagId: 95,
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form
      {...getFormProps(form)}
      action={action}
      noValidate
      className="flex flex-col gap-4 items-center"
    >
      <Textarea {...getTextareaProps(fields.content)} autoComplete="false" />
      {fields.content.errors && <div>{fields.content.errors}</div>}

      {/* TODO: タグ選択UIを追加するまで一旦仮で固定値 */}
      <input {...getInputProps(fields.tagId, { type: 'hidden' })} />

      <Button type="submit">送信する</Button>
    </form>
  );
};
