import { GeneralErrorHandler } from './GeneralErrorHandler';

export class ExternalServiceException extends GeneralErrorHandler {
  constructor(message: string) {
    super(message);
  }
}
