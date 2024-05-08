import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class Sku extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (value.length > 50) {
      throw new ValueObjectException('El SKU debe tener menos de 50 caracteres');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
