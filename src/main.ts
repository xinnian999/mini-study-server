import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import ip from './utils/ip';
import staticDirInit from './utils/staticDirInit';

async function bootstrap() {
  ip();
  staticDirInit()

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
