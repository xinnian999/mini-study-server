// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs-extra';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UploadService {
  constructor(private userService: UserService) {}

  async uploadUserAvatar(userId: number, path: string) {
    const oldAvatar = (await this.userService.findOneByUserId(userId)).avatar;

    await this.deleteImage(oldAvatar);

    return await this.userService.updateUserByUserId(userId, { avatar: path });
  }

  async deleteImage(url: string) {
    const fileName = url.split('/').pop();

    const filePath = url.replace(global.host, '');

    const dir = join(process.cwd(), 'static');

    const target = join(dir, filePath);

    try {
      await fs.remove(target); // 删除文件
      return `File ${fileName} deleted successfully`;
    } catch (err) {
      throw new Error(`Error deleting file: ${err.message}`);
    }
  }
}
