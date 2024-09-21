import { AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database } from '@/utils/supabase/type';
import { Avatar } from '@radix-ui/react-avatar';

import { useMessagePresenter } from './message-list.presenter';

type Props = {
  userId: string;
  messages: Database['public']['Tables']['messages']['Row'][];
};

export const MessageListComponent = ({ userId, messages }: Props) => {
  const { isSenderUser } = useMessagePresenter({ userId });

  return (
    <ScrollArea className="h-[400px] w-full pr-4">
      {messages.map((message) => {
        const isSender = isSenderUser(message.user_id);

        return (
          <div
            key={message.id}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`flex items-end ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback>{isSender ? 'U' : 'O'}</AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 py-2 px-3 rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200'} whitespace-pre-wrap`}
              >
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  );
};
