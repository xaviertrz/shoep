import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class AddressPhone extends ValueObject<bigint> {
  constructor(value: bigint) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: bigint): void {
    if (typeof value !== 'bigint' && typeof value !== 'number') {
      throw new ValueObjectException('El número de teléfono debe ser un número entero');
    }

    if (value.toString().length < 6 || value.toString().length > 10) {
      throw new ValueObjectException('El número de teléfono no es válido. Debe tener entre 6 y 10 dígitos');
    }
  }

  public getValue(): bigint {
    return this.value;
  }
}
