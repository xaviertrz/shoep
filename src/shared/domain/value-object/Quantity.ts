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

    if (value < 0) {
      throw new ValueObjectException('La cantidad no puede ser negativa');
    }

    if (value % 1 !== 0) {
      throw new ValueObjectException('La cantidad no puede ser un número decimal');
    }

    if (value === 0) {
      throw new ValueObjectException('La cantidad no puede ser cero');
    }
  }

  public getValue(): number {
    return this.value;
  }
}
