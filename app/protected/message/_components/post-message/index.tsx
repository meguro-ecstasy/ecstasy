'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

type Props = {
  questionId: number;
  userId: string;
};

export const PostMessageComponent = ({ questionId, userId }: Props) => {
  const [content, setContent] = useState('');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from('messages')
      .insert({
        user_id: userId,
        question_id: questionId,
        content,
      })
      .select('*');

    if (error) {
      console.error('エラーが発生しました:', error);
    } else {
      setContent(''); // フォームをリセット
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <Textarea
        name="content"
        placeholder="メッセージを入力してください"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input type="hidden" name="questionId" value={questionId} />
      <input type="hidden" name="userId" value={userId} />

      <Button type="submit">送信</Button>
    </form>
  );
};
