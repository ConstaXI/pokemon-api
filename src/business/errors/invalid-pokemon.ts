import HttpError from '../../domain/protocols/http-error';

export default class InvalidPokemon extends HttpError {
  constructor() {
    super('Um pokemon só pode ser do tipo charizard, mewtwo ou pikachu');
  }

  statusCode = 400;
}
