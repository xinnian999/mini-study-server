import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryService } from './gallery.service';
import { Gallery } from './gallery.entity';
import { GalleryController } from './gallery.controller';
import UploadModule from 'src/utils/UploadModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery]),
    UploadModule('gallery'),
  ],
  providers: [GalleryService],
  controllers: [GalleryController],
  exports: [GalleryService],
})
export class GalleryModule { }
