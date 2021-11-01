import { AppError } from 'src/errors/app.error';

export class EmailIsAlreadyTakenError extends AppError {
  constructor(message = 'This email is already taken.') {
    super(message, 'EmailIsAlreadyTakenError', 400);
  }
}
