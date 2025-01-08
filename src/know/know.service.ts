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

  async updateById(id: number, data: Know) {
    delete data.id;
    return this.knowRepository.update({ id }, data);
  }

  async addCorrectById(id: number) {
    // 查找指定 id 的实体
    const know = await this.knowRepository.findOne({ where: { id } });

    if (!know) {
      throw new Error('Know entity not found');
    }

    // 增加 correct 字段的值
    know.correct = (know.correct || 0) + 1;

    // 更新数据库
    return this.knowRepository.save(know);
  }

  async addErrorById(id: number) {
    // 查找指定 id 的实体
    const know = await this.knowRepository.findOne({ where: { id } });

    if (!know) {
      throw new Error('Know entity not found');
    }

    // 增加 error 字段的值
    know.error = (know.error || 0) + 1;

    // 更新数据库
    return this.knowRepository.save(know);
  }


  async deleteById(id: number) {
    return await this.knowRepository.delete(id);
  }
}
