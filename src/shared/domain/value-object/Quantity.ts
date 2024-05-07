import { ValueObject } from './ValueObject';
import { ValueObjectException } from '../exceptions/ValueObjectException';

export class Quantity extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: number): void {
    if (typeof value !== 'bigint' && typeof value !== 'number') {
      throw new ValueObjectException('La cantidad debe ser un número entero');
    }
  }

  public getValue(): number {
    return this.value;
  }
}
