import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// TODO: バリデーションとsubmit処理を実装
export const PostMessageFormComponent = () => {
  return (
    <form className="flex flex-col gap-4 items-center">
      <Textarea />

      {/* TODO: タグ選択UIを追加する */}

      <Button type="submit">送信する</Button>
    </form>
  );
};
