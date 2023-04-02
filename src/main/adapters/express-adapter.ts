import { Request, Response } from 'express';
import Controller from '../protocols/controller';

const expressAdapter =
  (controller: Controller<unknown>) =>
  async (request: Request, response: Response) => {
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
  };

export default expressAdapter;
