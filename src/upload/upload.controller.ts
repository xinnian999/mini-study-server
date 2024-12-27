import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/interface';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('userAvatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file')) // 将name为file的文件拦截下来
  userAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthRequest,
  ) {
    const path = `${global.host}/userAvatar/${file.filename}`;

    return this.uploadService.uploadUserAvatar(req.user.userId, path);
  }
}
