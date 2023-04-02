import HttpError from '../../domain/protocols/http-error';

export default class CannotUpdateFields extends HttpError {
  constructor() {
    super('Você só pode atualizar o treinador do Pokemon');
  }

  statusCode = 400;
}
