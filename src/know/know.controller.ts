import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { KnowService } from './know.service';

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

    // console.log(body)

    return this.knowService.addByGallery(typeId, images);
  }

  // 删除识图类型
  @Delete('delete')
  @UseGuards(AuthGuard)
  delete(@Query('id') id: number) {
    return this.knowService.deleteById(id);
  }
}
