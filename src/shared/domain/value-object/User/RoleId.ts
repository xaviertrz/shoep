import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class RoleId extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsNumber(value);
  }

  private ensureIsNumber(value: any): void {
    if (typeof value !== 'number') {
      throw new ValueObjectException('Role ID must be a number');
    }
  }

  getValue(): number {
    return this.value;
  }
}
