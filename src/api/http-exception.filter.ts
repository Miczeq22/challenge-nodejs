import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../errors/app.error';
import { InputValidationError } from '../errors/input-validation.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: AppError | BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      return response.status(422).json({
        message: 'Validation Error',
        code: InputValidationError.name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Circular class property
        details: exception.response.message,
      });
    }

    const status = exception.errorCode ?? 500;

    response.status(status).json({
      message: exception.message,
      code: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
