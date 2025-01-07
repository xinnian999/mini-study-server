import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  list(@Query('type') type?: string) {
    return this.galleryService.findAll(type);
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('file')) // 将name为file的文件拦截下来
  upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: Record<string, string>,
  ) {
    const { title, type } = body;

    return this.galleryService.upload({ files, title, type });
  }

  @Post('rename')
  @UseGuards(AuthGuard)
  rename(@Body() body: Record<string, any>) {
    return this.galleryService.rename(body.ids, body.title);
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  delete(@Body() body: Record<string, number[]>) {
    return this.galleryService.delete(body.ids);
  }
}
