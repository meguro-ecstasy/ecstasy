'use client';

import { useMemo } from 'react';
import { PostMessage, MessageContainer } from './_containers';
import { useMessagePageFacade } from './message-page.facade';

const MessagePage = ({
  searchParams,
}: {
  // see: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId } = useMessagePageFacade();
  const questionId = useMemo(() => searchParams['question_id'], [searchParams]);

  // NOTE: QuestionのIDがない場合は不正な繊維なのでエラーページを表示
  if (!questionId) {
    return <p>Invalid question id</p>;
  }

  // TODO: paramsを変換
  return (
    <div className="flex flex-col gap-4">
      <MessageContainer
        key={questionId}
        questionId={Number(questionId)}
        userId={userId}
      />
      <PostMessage questionId={Number(questionId)} userId={userId} />
    </div>
  );
};

export default MessagePage;
