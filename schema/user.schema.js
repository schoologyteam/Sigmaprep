import { z } from "zod";
export const userSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(1).max(25),
  password_hash: z.string().nullable(),
  email: z.string().email().max(100),
  first_name: z.string().max(50).nullable().optional(),
  last_name: z.string().max(50).nullable().optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  last_login: z.coerce.date().nullable().optional(),
  icon: z.string().url().max(2048).nullable().optional(),
  provider: z.string().max(64),
  provider_id: z.string().max(2048),
  is_creator: z.boolean().default(false),
});
