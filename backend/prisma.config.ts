import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // para aplicar npx prisma db seed
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
});
