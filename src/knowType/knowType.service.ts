// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { KnowType } from './knowType.entity';

@Injectable()
export class KnowTypeService {
  constructor(
    @InjectRepository(KnowType)
    private knowTypeRepository: Repository<KnowType>,
  ) {}

  async findAll(userId: number) {
    return this.knowTypeRepository.find({
      where: { userId },
    });
  }

  async findOneById(id: number): Promise<KnowType | undefined> {
    return this.knowTypeRepository.findOne({ where: { id } });
  }

  async create(params: KnowType) {
    const user = this.knowTypeRepository.create(params);
    return this.knowTypeRepository.save(user);
  }

  async updateById(id: number, data: Partial<KnowType>): Promise<UpdateResult> {
    delete data.id;
    return this.knowTypeRepository.update({ id }, data);
  }

  async deleteById(id: number) {
    return await this.knowTypeRepository.delete(id);
  }
}
