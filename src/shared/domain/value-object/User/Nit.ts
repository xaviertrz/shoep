import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class Nit extends ValueObject<bigint> {
  constructor(value: bigint) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: bigint): void {
    if (typeof value !== 'bigint' && typeof value !== 'number') {
      throw new ValueObjectException('El NIT debe ser un número entero');
    }

    if (value.toString().length < 8) {
      throw new ValueObjectException('El NIT debe tener al menos 8 digitos');
    }

    if (value.toString().length > 12) {
      throw new ValueObjectException('El nit no puede tener más de 12 digitos');
    }

    if (value < 0) {
      throw new ValueObjectException('El NIT no puede ser un número negativo');
    }
  }

  public getValue(): bigint {
    return this.value;
  }
}
