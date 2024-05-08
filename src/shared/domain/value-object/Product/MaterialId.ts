import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class MaterialId extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsNumber(value);
  }

  private ensureIsNumber(value: any): void {
    if (typeof value !== 'number') {
      throw new ValueObjectException(`El id del material <"${value}"> no es un número`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
