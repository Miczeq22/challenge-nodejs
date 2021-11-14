import { AppError } from '../../../errors/app.error';

export class DeskSpaceTypeNotSupportedError extends AppError {
  constructor(message = 'Provided Desk Space Type is not supported.') {
    super(message, 'DeskSpaceTypeNotSupportedError', 422);
  }
}
