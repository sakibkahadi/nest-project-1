import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception should be a HttpException
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // with this we tell nest js we don't work with a web socket we work http protocol. means will aceess request and response
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isDevelopment = process.env.NODE_ENV === 'development';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    response.status(status).json({
      status: false,
      message: message,
      data: null,
      ...(isDevelopment && {
        stack: exception instanceof Error ? exception.stack : null,
      }),
    });
  }
}
