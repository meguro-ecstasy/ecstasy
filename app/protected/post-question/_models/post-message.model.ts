import { z } from 'zod';

export const postMessageSchema = z.object({
  tagId: z.number(),
  content: z.string({ required_error: '必須です' }).max(1000),
});

export type PostMessageSchema = z.infer<typeof postMessageSchema>;
