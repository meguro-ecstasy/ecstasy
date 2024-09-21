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
              <TableHead>質問一覧</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!!questions ? (
              questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.content}</TableCell>
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
