import { Controller, Get, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('list')
  list(@Query('type') type: string) {
    return this.galleryService.findAll(type);
  }
}
