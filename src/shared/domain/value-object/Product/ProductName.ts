import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class ProductName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsNotEmpty(value);
  }

  private ensureIsNotEmpty(name: string): void {
    if (name.trim().length === 0) {
      throw new ValueObjectException('El nombre del producto es obligatorio');
    }
    if (name.trim().length < 3) {
      throw new ValueObjectException('El nombre del producto debe tener al menos 3 caracteres');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
