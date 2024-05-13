import { ValueObject } from '../ValueObject';

export class Key extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  public getValue(): string {
    return this.value;
  }
}
