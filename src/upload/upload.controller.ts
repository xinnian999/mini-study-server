import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('gallery')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('file')) // 将name为file的文件拦截下来
  gallery(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: Record<string,string>,
  ) {
    this.uploadService.uploadGallery(files, body.type);
  }
}
