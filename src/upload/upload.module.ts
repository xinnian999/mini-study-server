import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { join } from 'path';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const target = req.url.split('/').pop();

          // 上传文件的目录 保证项目根目录中public/uploads文件夹存在
          cb(null, join(__dirname, '../..', `static/${target}`));
        },
        filename: (req, file, cb) => {
          // 上传文件的文件名称
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
    UserModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
