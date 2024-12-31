import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from 'src/upload/upload.module';
import { GalleryModule } from 'src/gallery/gallery.module';
import { KnowTypeModule } from 'src/knowType/knowType.module';

@Module({
  imports: [
    // 数据库配置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '991015',
      database: 'study',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    // 静态服务配置
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
    }),
    UserModule,
    AuthModule,
    UploadModule,
    GalleryModule,
    KnowTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
