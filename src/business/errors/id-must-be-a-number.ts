import HttpError from '../../domain/protocols/http-error';

export default class IdMustBeANumber extends HttpError {
  constructor() {
    super('Um id deve ser do tipo número');
  }

  statusCode = 400;
}
