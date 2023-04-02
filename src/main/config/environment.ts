import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3333,
  ENVIRONMENT: process.env.ENVIRONMENT || 'local',
};
