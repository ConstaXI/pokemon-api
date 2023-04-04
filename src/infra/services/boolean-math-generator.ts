import { injectable } from 'inversify';
import BooleanGenerator from '../../business/protocols/services/boolean-generator';

@injectable()
export default class BooleanMathGenerator implements BooleanGenerator {
  generate(probability: number): boolean {
    return Math.random() < probability;
  }
}
