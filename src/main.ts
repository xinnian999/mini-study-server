import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ip, staticDirInit } from './utils';
import { UrlInterceptor } from './utils';

async function bootstrap() {
  ip();
  staticDirInit();

  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 支持跨域访问
  app.useGlobalInterceptors(new UrlInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
