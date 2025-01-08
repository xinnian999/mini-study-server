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
import { KnowModule } from 'src/know/know.module';

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
      serveStaticOptions: {
        setHeaders: (res, path) => {
          // 如果是图片文件，设置长时间缓存
          if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1年缓存
          }
        },
      },
    }),
    UserModule,
    AuthModule,
    UploadModule,
    GalleryModule,
    KnowTypeModule,
    KnowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
