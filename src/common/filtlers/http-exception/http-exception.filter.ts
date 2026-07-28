import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception should be a HttpException
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // with this we tell nest js we don't work with a web socket we work http protocol. means will aceess request and response
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    response.status(status).json({
      // statusCode: status,
      status: false,
      message: exception.message,
      data: null,
    });
  }
}
