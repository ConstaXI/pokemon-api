import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import setupRoutes from './routes';
import '../ioc/load';

const app = express();

app.use(express.json());
app.use(cors());

await setupRoutes(app);

export default app;
