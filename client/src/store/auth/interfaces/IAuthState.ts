import { IBuyer } from '../../../interfaces/IBuyer';
import { ISeller } from '../../../interfaces/ISeller';

export interface IAuthState {
  status: 'authenticated' | 'not-authenticated' | 'checking';
  user?: IBuyer | ISeller;
  errorMessage?: string;
}
