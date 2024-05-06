import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class AddressLine extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string) {
    if (value.length < 3 || value.length > 255) {
      throw new ValueObjectException(`La dirección debe tener entre 3 y 255 caracteres`);
    }
  }

  getValue(): string {
    return this.value;
  }
}
