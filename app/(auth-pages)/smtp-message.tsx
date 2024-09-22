import { ArrowUpRight, InfoIcon } from 'lucide-react';
import Link from 'next/link';

export function SmtpMessage() {
  return (
    <div className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong>注意：</strong>
          メールの送信には制限があります。カスタムSMTPを有効にすることで、
          送信制限を増やすことができます。
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
          >
            詳細を見る <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
