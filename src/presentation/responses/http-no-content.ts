import { HttpResponse } from '../protocols/http-response';
import { Ok, ok } from '../../domain/protocols/result';
import HttpError from '../../domain/protocols/http-error';

export default function httpNoContent(): Ok<HttpResponse<null>, HttpError> {
  return ok({
    statusCode: 204,
  });
}
