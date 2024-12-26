// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UploadService {
  constructor(private userService: UserService) {}

  async uploadUserAvatar(userId: number, path: string) {
    return await this.userService.updateUserByUserId(userId, { avatar: path });
  }
}
