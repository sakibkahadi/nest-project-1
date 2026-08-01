import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filtlers/http-exception/http-exception.filter';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for use prefix before the route
  app.setGlobalPrefix('api/v1');
  // for enable dat validation by dto globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); // for use interceptors
  // reflector reads the setMetadata from curstom decorator as we use custom decorator in tranformInterceptor thats why we use app.get(Reflector) this here
  app.useGlobalInterceptors(
    new TransformInterceptor(app.get(Reflector)),
    // uses for formdata use globally in the project
    new (AnyFilesInterceptor())(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
