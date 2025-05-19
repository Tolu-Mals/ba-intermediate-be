import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  environment: z.enum(['development', 'staging', 'production'], {
    message: 'You need to specify an environment in your .env file',
  }),
  PORT: z.number().optional().default(3000),
  //   DATABASE_URL: z
  //     .string()
  //     .url({ message: "You need to set DATABASE_URL in your .env file" }),
});

const parsedEnv = envSchema.parse(process.env);

export default parsedEnv;
