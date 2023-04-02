export default abstract class HttpError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }
}
