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
}
