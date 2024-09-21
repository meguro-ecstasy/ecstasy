import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Tables } from '@/utils/supabase/type';

export default async function GetQuestionPage({
  questions,
}: {
  questions: Tables<'questions'>[];
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="container mx-auto mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>質問</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>作成日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!!questions ? (
              questions.map((question) => (
                <TableRow key={question.id}>
                  <Link href={`/protected/message/${question.id}`}>
                    <TableCell>{question.content}</TableCell>
                    <TableCell>花山薫</TableCell>
                    <TableCell>オープン</TableCell>
                    <TableCell>2024/02/20</TableCell>
                  </Link>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>質問はありません</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                Total Questions: {!!questions ? questions.length : 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
