import { ValueObject } from './ValueObject';
import { ValueObjectException } from '../exceptions/ValueObjectException';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(email: string): void {
    if (email.trim().length === 0) {
      throw new ValueObjectException('El email es obligatorio');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValueObjectException(`El email <${email}> no es válido`);
    }
  }

  public getValue(): string {
    return this.value;
  }
}
