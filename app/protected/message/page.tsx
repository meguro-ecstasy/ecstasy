import { MessageContainer } from './_containers/message.container';
import { PostMessage } from './_containers/post.message';

const MessagePage = ({
  searchParams,
}: {
  // see: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: { [key: string]: string | undefined };
}) => {
  const questionId = searchParams['question_id'];

  // NOTE: QuestionのIDがない場合は不正な繊維なのでエラーページを表示
  if (!questionId) {
    return <p>Invalid question id</p>;
  }

  // paramsを変換
  return (
    <div>
      <MessageContainer key={questionId} questionId={Number(questionId)} />
      <PostMessage questionId={Number(questionId)} />
    </div>
  );
};

export default MessagePage;
