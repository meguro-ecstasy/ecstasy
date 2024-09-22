'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { postMessageAction } from '../../_actions';
import { getFormProps, useForm, getTextareaProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { postMessageSchema, PostMessageSchema } from '../../_models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
};

export const PostMessageFormComponent: React.FC<Props> = ({ options }) => {
  const [lastResult, action] = useFormState(postMessageAction, undefined);
  const [form, fields] = useForm<PostMessageSchema>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postMessageSchema });
    },
    defaultValue: null,
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
      <div className="flex flex-col w-full items-center gap-10">
        <div className="flex flex-col w-full items-center gap-2">
          <Label
            className="text-left w-full text-lg"
            htmlFor={fields.content.id}
          >
            概要
          </Label>
          <Textarea
            {...getTextareaProps(fields.content)}
            id={fields.content.id}
            autoComplete="false"
          />
          {fields.content.errors && (
            <div className="text-red-500 text-sm">{fields.content.errors}</div>
          )}
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <Label className="text-left w-full text-lg" htmlFor={fields.tagId.id}>
            タグ
          </Label>
          <Select
            key={fields.tagId.key}
            name={fields.tagId.name}
            defaultValue={fields.tagId.initialValue}
            onValueChange={(value) => {
              form.update({
                name: fields.tagId.name,
                value,
              });
            }}
          >
            <SelectTrigger
              id={fields.tagId.id}
              aria-invalid={!fields.tagId.valid || undefined}
              aria-describedby={
                !fields.tagId.valid ? fields.tagId.errorId : undefined
              }
            >
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {options.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fields.tagId.errors && (
            <div className="text-red-500 text-sm">{fields.content.errors}</div>
          )}
        </div>

        <Button className="w-full" type="submit">
          投稿する
        </Button>
      </div>
    </form>
  );
};
