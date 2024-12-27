import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ip from './ip';
import staticDirInit from './staticDirInit';

async function bootstrap() {
  ip();
  staticDirInit()

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
