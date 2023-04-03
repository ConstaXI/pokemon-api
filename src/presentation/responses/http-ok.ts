import { HttpResponse } from '../protocols/http-response';
import { Ok, ok } from '../../domain/protocols/result';
import HttpError from '../../domain/protocols/http-error';

export default function httpOk<T>(body: T): Ok<HttpResponse<T>, HttpError> {
  return ok({
    statusCode: 200,
    body,
  });
}
