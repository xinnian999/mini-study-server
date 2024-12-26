// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(params: User) {
    const user = this.userRepository.create(params);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async findOneByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByUserId(useId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: useId } });
  }

  async updateUserByUserId(
    useId: number,
    userInfo: Partial<User>,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ id: useId }, userInfo);
  }
}
