import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import setupRoutes from './routes';
import '../ioc/load';
import swaggerDocumentation from '../docs/swagger';

const app = express();

app.use(express.json());
app.use(cors());

await setupRoutes(app);
swaggerDocumentation(app);

export default app;
