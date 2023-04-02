import { Express, Router } from 'express';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use(router);
  const promises = readdirSync(
    `${path.dirname(fileURLToPath(import.meta.url))}/../routes`,
  ).map(async file => {
    const imported = await import(`../routes/${file}`);

    const { default: route } = imported;

    route(router);
  });

  await Promise.all(promises);
};
