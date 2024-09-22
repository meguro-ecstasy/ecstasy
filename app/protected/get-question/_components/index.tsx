import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/utils/supabase/type';
import { formatDate } from '@/utils';
import { Label } from '@/components/ui/label';

export default async function GetQuestion({
  questions,
  tag,
  askedQuestions,
}: {
  questions?: Tables<'questions'>[];
  tag: string;
  askedQuestions?: Tables<'questions'>[];
}) {
  const format = 'YYYY年MM月DD日';
  return (
    <>
      <div>
        <Label className="text-lg">助けが必要な質問</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-96">質問内容</TableHead>
              <TableHead className="w-32">タグ</TableHead>
              <TableHead className="w-32">質問した人</TableHead>
              <TableHead className="w-32 md:table-cell">作成日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!!questions ? (
              questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Link
                      href={`/protected/message?question_id=${question.id}`}
                      className="block whitespace-pre-wrap"
                    >
                      {question.content}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-500 text-white font-light	"
                    >
                      {tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {/* @ts-expect-error -- _ */}
                    {question.users.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(new Date(question.created_at), format)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>質問はありません</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Label className="text-lg">自分がした質問</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-96">質問</TableHead>
              <TableHead className="w-32">タグ</TableHead>
              <TableHead className="w-32 md:table-cell">作成日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!!askedQuestions ? (
              askedQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Link
                      href={`/protected/message?question_id=${question.id}`}
                      className="block whitespace-pre-wrap"
                    >
                      {question.content}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-500 text-white font-light"
                    >
                      {/* @ts-ignore */}
                      {question.tags.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(new Date(question.created_at), format)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>質問はありません</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
