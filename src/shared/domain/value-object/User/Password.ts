import { ValueObject } from '../ValueObject';
import { ValueObjectException } from '../../exceptions/ValueObjectException';

export class Password extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsStrong(value);
  }

  private ensureIsStrong(password: string): void {
    if (password.length < 8) {
      throw new ValueObjectException('La contraseña debe tener al menos 8 caracteres');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) {
      throw new ValueObjectException('La contraseña debe tener al menos una letra mayúscula');
    }

    if (!hasLowerCase) {
      throw new ValueObjectException('La contraseña debe tener al menos una letra minúscula');
    }

    if (!hasNumbers) {
      throw new ValueObjectException('La contraseña debe tener al menos un número');
    }

    if (!hasSpecialChar) {
      throw new ValueObjectException('La contraseña debe tener al menos un caracter especial');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
