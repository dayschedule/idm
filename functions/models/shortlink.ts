import { z } from 'zod';

export class ShortLink {
  key?: string;
  url?: string;
  short_url?: string;
  params?: Record<string, string> = {};
  created_at?: Date;
  updated_at?: Date;
  expire_at?: Date;
}

export const linkSchema = z.object({
  key: z.string().optional(),
  url: z.string().url(),
  params: z.record(z.string()).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  expire_at: z.date().optional(),
});
