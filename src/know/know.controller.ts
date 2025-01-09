import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Query,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { KnowService } from './know.service';
import { Know } from './know.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('know')
export class KnowController {
  constructor(private readonly knowService: KnowService) {}

  // 查询识图
  @UseGuards(AuthGuard)
  @Get('list')
  list(@Query('typeId') typeId: number) {
    return this.knowService.findAllByTypeId(typeId);
  }

  // 从图库选择图片-创建识图
  @Post('addByGallery')
  @UseGuards(AuthGuard)
  addByGallery(@Body() body: Record<string, any>) {
    const { typeId, images } = body;

    return this.knowService.addByGallery(typeId, images);
  }

  // 从相册选择图片-创建识图
  @UseGuards(AuthGuard)
  @Post('addByAlbum')
  @UseInterceptors(FilesInterceptor('file')) // 将name为file的文件拦截下来
  addByAlbum(
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.knowService.addByAlbum(body.typeId, files);
  }

  // 增加一次正确
  @Put('addCorrect')
  @UseGuards(AuthGuard)
  addCorrect(@Body() body: Know) {
    return this.knowService.addCorrectById(body.id);
  }

  // 增加一次错误
  @Put('addError')
  @UseGuards(AuthGuard)
  addError(@Body() body: Know) {
    return this.knowService.addErrorById(body.id);
  }

   // 增加一次错误
   @Put('reset')
   @UseGuards(AuthGuard)
   reset(@Body() body: Know) {
     return this.knowService.resetById(body.id);
   }

  // 删除识图
  @Delete('delete')
  @UseGuards(AuthGuard)
  delete(@Query('id') id: number) {
    return this.knowService.deleteById(id);
  }
}
