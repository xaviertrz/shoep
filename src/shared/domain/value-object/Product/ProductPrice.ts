import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class ProductPrice extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: number): void {
    if (typeof value !== 'number') {
      throw new ValueObjectException(`El precio <"${value}"> no es un número`);
    }

    if (value <= 0) {
      throw new ValueObjectException(`El precio <${value}> no es válido, el precio debe ser un número mayor a 0`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
