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

export const fail = <F>(value: F): Fail<never, F> => {
  return new Fail(value);
};

export const ok = <O>(value: O): Ok<O, never> => {
  return new Ok(value);
};
