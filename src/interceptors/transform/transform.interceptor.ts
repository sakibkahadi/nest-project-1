import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { MESSAGE_KEY } from 'src/common/decorators/message/message.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ status: boolean; message: string; data: T }> {
    const message =
      this.reflector.get<string>(MESSAGE_KEY, context.getHandler()) ??
      'Request successful';
    return next.handle().pipe(map((data) => ({ status: true, message, data })));
  }
}
