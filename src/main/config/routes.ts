import { Express, Router } from 'express';
import { readdirSync } from 'node:fs';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use(router);
  // eslint-disable-next-line unicorn/prefer-module
  const files = readdirSync(`${__dirname}/routes`);

  const promises = files.map(async file => {
    if (!file.endsWith('.map')) {
      const { default: route } = await import(`./routes/${file}`);

      route(router);
    }
  });

  await Promise.all(promises);
};
