import { Express, Router } from 'express';
import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use(router);

  const path = dirname(fileURLToPath(import.meta.url));

  const files = readdirSync(`${path}/../routes`);

  const fileWithRoutes = files.filter(file => file.endsWith('.js'));

  const promises = fileWithRoutes.map(async file => {
    const { default: route } = await import(`../routes/${file}`);

    route(router);
  });

  await Promise.all(promises);
};
