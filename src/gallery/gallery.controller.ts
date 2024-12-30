import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  list(@Query('type') type: string) {
    return this.galleryService.findAll(type);
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  delete(@Body() body: Record<string, number[]>) {
    return this.galleryService.delete(body.ids);
  }
}
