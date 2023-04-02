/* eslint-disable max-classes-per-file */
export class Fail<O, F> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isFail(): this is Fail<O, F> {
    return true;
  }

  // eslint-disable-next-line no-use-before-define
  isOk(): this is Ok<O, F> {
    return false;
  }
}

export class Ok<O, F> {
  readonly value: O;

  constructor(value: O) {
    this.value = value;
  }

  isFail(): this is Fail<O, F> {
    return false;
  }

  isOk(): this is Ok<O, F> {
    return true;
  }
}

export type Result<O, F> = Fail<O, F> | Ok<O, F>;

export const fail = <O, F>(value: F): Result<O, F> => {
  return new Fail(value);
};

export const ok = <O, F>(value: O): Result<O, F> => {
  return new Ok<O, F>(value);
};
