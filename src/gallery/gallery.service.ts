// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  async findAll(type: string): Promise<Gallery[] | undefined> {
    return this.galleryRepository.find({
      where: { type },
    });
  }

  async create(datas: Gallery[]) {
    const gallerys = this.galleryRepository.create(datas);
    return this.galleryRepository.save(gallerys);
  }
}
