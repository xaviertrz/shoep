import { IBuyer } from './IBuyer';
import { ISeller } from './ISeller';

export interface IAuthState {
  status: 'authenticated' | 'not-authenticated' | 'checking';
  user: IBuyer | ISeller;
  errorMessage?: string;
}
