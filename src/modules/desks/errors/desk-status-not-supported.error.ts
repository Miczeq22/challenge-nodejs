import { AppError } from '../../../errors/app.error';

export class DeskStatusNotSupportedError extends AppError {
  constructor(message = 'Provided Desk Status is not supported.') {
    super(message, 'DeskStatusNotSupportedError', 422);
  }
}
