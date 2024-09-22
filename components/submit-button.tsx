'use client';

import { Button } from '@/components/ui/button';
import { type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

type Props = ComponentProps<typeof Button>;

export function SubmitButton({ children, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full text-lg"
      disabled={pending}
      type="submit"
      {...props}
    >
      {pending ? (
        <div className="flex justify-center" aria-label="読み込み中">
          <div className="animate-spin h-6 w-6 border-4 border-white rounded-full border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
