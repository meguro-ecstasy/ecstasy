import { z } from 'zod';

export const userSettingSchema = z.object({
    value: z.string(),
    name: z.string()
});

export type UserSettingSchema = z.infer<typeof userSettingSchema>;
