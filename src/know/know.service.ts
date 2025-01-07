import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Know } from './know.entity';
import { Repository } from 'typeorm';
import { Gallery } from 'src/gallery/gallery.entity';
import copyStatic from 'src/utils/copyStatic';

@Injectable()
export class KnowService {
  constructor(
    @InjectRepository(Know)
    private knowRepository: Repository<Know>,
  ) {}

  async findAllByTypeId(typeId: number) {
    return this.knowRepository.find({
      where: { typeId },
      order: { id: 'DESC' },
    });
  }

  // 将图库数据copy到某个识图类型里
  async addByGallery(typeId: number, images: Gallery[]) {
    const reqs = images.map(async (item) => {
      const newUrl = await copyStatic(item.url, 'know');

      const know = this.knowRepository.create({
        typeId,
        url: newUrl,
        title: item.title,
      });

      return this.knowRepository.save(know);
    });

    return await Promise.all(reqs);
  }

  async deleteById(id: number) {
    return await this.knowRepository.delete(id);
  }
}
