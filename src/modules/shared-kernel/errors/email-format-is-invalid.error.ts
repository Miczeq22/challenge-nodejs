import { AppError } from 'src/errors/app.error';

export class EmailFormatIsInvalidError extends AppError {
  constructor(message = 'Provided email format is invalid.') {
    super(message, 'EmailFormatIsInvalidError', 400);
  }
}
