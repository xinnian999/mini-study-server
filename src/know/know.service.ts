import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Know } from './know.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KnowService {
  constructor(
    @InjectRepository(Know)
    private knowRepository: Repository<Know>,
  ) {}

  async findAllByTypeId(typeId: number) {
    return this.knowRepository.find({
      where: { typeId },
    });
  }

  async create(params: Know) {
    const user = this.knowRepository.create(params);
    return this.knowRepository.save(user);
  }
}
