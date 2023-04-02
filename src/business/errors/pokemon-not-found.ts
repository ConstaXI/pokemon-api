import HttpError from '../../domain/protocols/http-error';

export default class PokemonNotFound extends HttpError {
  constructor() {
    super('Pokemon não encontrado');
  }

  statusCode = 404;
}
