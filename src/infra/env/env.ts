import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  ENABLE_SWAGGER: z.string().optional().default('FALSE'),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PUBLIC_KEY: z.string(),
  APP_PRIVATE_KEY: z.coerce.string(),
  JWT_TOKEN_EXPIRES_IN: z.string(),
  PUBLIC_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
