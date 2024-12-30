// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GalleryService } from 'src/gallery/gallery.service';
import deleteStatic from 'src/utils/deleteStatic';

@Injectable()
export class UploadService {
  constructor(
    private userService: UserService,
    private galleryService: GalleryService,
  ) {}

  async uploadUserAvatar(userId: number, path: string) {
    const oldAvatar = (await this.userService.findOneByUserId(userId)).avatar;

    await deleteStatic(oldAvatar);

    return await this.userService.updateUserByUserId(userId, { avatar: path });
  }

  async uploadGallery(files: Express.Multer.File[], type: string) {

    const datas = files.map((file) => {
      const url = `${global.host}/gallery/${file.filename}`;
      return {
        url,
        type,
      };
    });
    this.galleryService.create(datas);
  }
}
