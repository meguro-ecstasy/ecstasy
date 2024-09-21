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

export default async function GetQuestion({
  questions,
  tag,
}: {
  questions: Tables<'questions'>[];
  tag: string;
}) {
  const format = 'YYYY年MM月DD日';
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>質問</TableHead>
            <TableHead>タグ</TableHead>
            <TableHead className="hidden md:table-cell">作成日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!questions ? (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium">
                  {/* @ts-ignore */}
                  {question.users.name}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/protected/message?question_id=${question.id}`}
                    className="block"
                  >
                    {question.content}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className="bg-red-500 text-white font-light	"
                  >
                    {tag}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(new Date(question.created_at), format)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>質問はありません</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
