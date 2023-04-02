import HttpError from './http-error';
import { Result } from './result';

export interface Interactor<Return, Errors extends HttpError> {
  execute(..._arguments: unknown[]): Promise<Result<Return, Errors>>;
}
