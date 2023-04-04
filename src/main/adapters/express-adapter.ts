import { Request, Response } from 'express';
import Controller from '../../presentation/protocols/controller';

const expressAdapter =
  (controller: Controller<unknown>) =>
  async (request: Request, response: Response) => {
    try {
      const input = {
        ...request.body,
        ...request.params,
        ...request.query,
      };

      const output = await controller.handle(input);

      if (output.isFail()) {
        return response
          .status(output.value.statusCode)
          .json({ message: output.value.message });
      }

      return response.status(output.value.statusCode).json(output.value.body);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: 'Um erro inesperado aconteceu' });
    }
  };

export default expressAdapter;
