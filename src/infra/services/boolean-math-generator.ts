import BooleanGenerator from '../../business/protocols/services/boolean-generator';

export default class BooleanMathGenerator implements BooleanGenerator {
  generate(probability: number): boolean {
    return Math.random() < probability;
  }
}
