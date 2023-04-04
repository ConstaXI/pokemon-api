import { injectable } from 'inversify';
import BooleanGenerator from '../../../src/business/protocols/services/boolean-generator';

@injectable()
export default class FakeBooleanGenerator implements BooleanGenerator {
  generate(probability: number): boolean {
    return true;
  }
}

export const fakeBooleanGeneratorGenerate = jest.spyOn(
  FakeBooleanGenerator.prototype,
  'generate',
);
