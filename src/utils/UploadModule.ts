import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

const UploadModule = (dir: string) => {
    return MulterModule.register({
        storage: diskStorage({
            destination: (req, file, cb) => {

                // 上传文件的目录 保证项目根目录中static/target文件夹存在
                cb(null, join(process.cwd(), `static/${dir}`));
            },
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                // 上传文件的文件名称
                cb(null, filename);
            },
        }),
    })
}
export default UploadModule