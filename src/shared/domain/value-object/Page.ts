import { ValueObjectException } from '../exceptions/ValueObjectException';

export class Page {
  private readonly value: number;

  constructor(value: number = 1) {
    if (typeof value !== 'number' || value <= 0) {
      throw new ValueObjectException('La página debe ser un número positivo.');
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
