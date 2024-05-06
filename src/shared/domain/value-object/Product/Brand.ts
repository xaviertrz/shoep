import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class Brand extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsNotEmpty(value);
  }

  private ensureIsNotEmpty(brand: string): void {
    if (brand.trim().length === 0) {
      throw new ValueObjectException('La marca del producto es obligatoria');
    }
    if (brand.trim().length < 2) {
      throw new ValueObjectException('La marca del producto debe tener al menos 2 caracteres');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
