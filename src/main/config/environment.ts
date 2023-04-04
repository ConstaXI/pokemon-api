import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3333,
  ENVIRONMENT: process.env.ENVIRONMENT || 'local',
  DATABASE_NAME: process.env.DATABASE_NAME || 'pokemon',
  DATABASE_USER: process.env.DATABASE_USER || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
  DATABASE_URL: process.env.DATABASE_URL || 'localhost',
  DATABASE_PORT: Number(process.env.DATABASE_USER) || 5432,
};
