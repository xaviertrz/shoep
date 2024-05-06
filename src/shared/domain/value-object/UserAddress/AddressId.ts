import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class AddressId extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: number): void {
    if (typeof value !== 'number') {
      throw new ValueObjectException(`El id de la dirección <"${value}"> no es un número`);
    }

    if (value < 0) {
      throw new ValueObjectException(`El id de la dirección <${value}> no es válido, debe ser mayor o igual a 0`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
