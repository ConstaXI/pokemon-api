import HttpError from '../../domain/protocols/http-error';
import { Result } from '../../domain/protocols/result';
import { HttpResponse } from './http-response';

export default interface Controller<
  Return,
  Errors extends HttpError = HttpError,
> {
  handle(request: unknown): Promise<Result<HttpResponse<Return>, Errors>>;
}
