import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { join } from 'path';
import { UserModule } from 'src/user/user.module';
import { GalleryModule } from 'src/gallery/gallery.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const target = req.url.split('/').pop();

          // 上传文件的目录 保证项目根目录中static/target文件夹存在
          cb(null, join(process.cwd(), `static/${target}`));
        },
        filename: (req, file, cb) => {

          const filename = `${Date.now()}-${file.originalname}`;

          // req['filePath'] = `${global.host}/userAvatar/${filename}`;
          // 上传文件的文件名称
          cb(null, filename);
        },
      }),
    }),
    UserModule,
    GalleryModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
