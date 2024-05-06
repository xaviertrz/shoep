import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class Active extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.ensureIsNumber(value);
  }

  private ensureIsNumber(value: any): void {
    if (typeof value !== 'boolean') {
      throw new ValueObjectException('Active debe ser un booleano');
    }
  }
}
