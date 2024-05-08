import { ValueObjectException } from '../../exceptions/ValueObjectException';
import { ValueObject } from '../ValueObject';

export class Description extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string) {
    const [leftLimit, rightLimit] = [10, 1000];
    if (value.length < leftLimit || value.length > rightLimit) {
      throw new ValueObjectException(`La descripción del producto debe tener entre 10 y 1000 caracteres`);
    }
  }
}
