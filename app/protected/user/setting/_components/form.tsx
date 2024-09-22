'use client';
import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { UserSettingSchema, userSettingSchema } from '../_models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { postUserSetting } from '../_actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  defaultValue: string | null;
};

export const Form: React.FC<Props> = ({ options, defaultValue }) => {
  const [lastResult, action] = useFormState(postUserSetting, undefined);
  const [form, fields] = useForm<UserSettingSchema>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userSettingSchema });
    },
    defaultValue: defaultValue ? { value: defaultValue } : null,
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form
      {...getFormProps(form)}
      action={action}
      noValidate
      className="flex flex-col gap-4 items-center w-full"
    >
      <div className="flex flex-col items-center w-full gap-10">
        <div className="w-full flex flex-col items-center gap-2">
          <Label className="text-left w-full text-lg" htmlFor={fields.value.id}>
            タグ
          </Label>
          <Select
            key={fields.value.key}
            name={fields.value.name}
            defaultValue={fields.value.initialValue}
            onValueChange={(value) => {
              form.update({
                name: fields.value.name,
                value,
              });
            }}
          >
            <SelectTrigger
              id={fields.value.id}
              aria-invalid={!fields.value.valid || undefined}
              aria-describedby={
                !fields.value.valid ? fields.value.errorId : undefined
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
        </div>

        <div className="w-full">
          <SubmitButton>保存する</SubmitButton>
        </div>
      </div>
    </form>
  );
};
