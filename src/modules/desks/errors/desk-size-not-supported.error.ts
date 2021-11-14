import { AppError } from '../../../errors/app.error';

export class DeskSizeNotSupportedError extends AppError {
  constructor(message = 'Provided Desk Size is not supported.') {
    super(message, 'DeskSizeNotSupportedError', 422);
  }
}
