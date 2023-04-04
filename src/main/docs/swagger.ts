import { Request, Response, Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/main/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocumentation(app: Express) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(swaggerSpec);
  });

  console.info(`Docs available at /docs`);
}
