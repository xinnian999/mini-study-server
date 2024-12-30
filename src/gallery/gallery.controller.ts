import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('list')
  list(@Query('type') type: string) {
    return this.galleryService.findAll(type);
  }

  @Post('delete')
  delete(@Body() body: Record<string, number[]>) {
    
    return this.galleryService.delete(body.ids);
  }
}
