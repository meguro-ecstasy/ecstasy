import { z } from 'zod';

export const userSettingSchema = z.object({
    value: z.string(),
});

export type UserSettingSchema = z.infer<typeof userSettingSchema>;
