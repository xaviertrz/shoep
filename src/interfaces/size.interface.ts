import { Decimal } from '@prisma/client/runtime/library';

export interface ISize {
  id: number;
  number: number;
  centimeters: Decimal;
}
