import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class Upc extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsNumber(value);
    this.ensureIsValid(value);
  }

  private ensureIsNumber(value: any): void {
    if (typeof value !== 'number') {
      throw new ValueObjectException(`El UPC <"${value}"> no es un número`);
    }
  }

  private ensureIsValid(value: number): void {
    if (value.toString().length !== 12) {
      throw new ValueObjectException(`El UPC <${value}> no es válido, debe tener 12 dígitos`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
