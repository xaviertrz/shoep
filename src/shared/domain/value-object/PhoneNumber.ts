import { ValueObject } from './ValueObject';
import { ValueObjectException } from '../exceptions/ValueObjectException';

export class PhoneNumber extends ValueObject<bigint> {
  constructor(value: bigint) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: bigint): void {
    if (typeof value !== 'bigint' && typeof value !== 'number') {
      throw new ValueObjectException('El número de teléfono debe ser un número entero');
    }

    const hasColombianFormat = /^3[0-9]{9}$/.test(value.toString());
    if (!hasColombianFormat) {
      throw new ValueObjectException('El número de teléfono debe tener el formato colombiano (3XX XXX XXXX)');
    }
  }

  public getValue(): bigint {
    return this.value;
  }
}
