export const BooleanGeneratorSymbol = Symbol('BooleanGenerator');

export default interface BooleanGenerator {
  generate(probability: number): boolean;
}
