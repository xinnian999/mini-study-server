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
import { Know } from './know.entity';

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

  // 从图库选择图片-创建识图
  @Put('update')
  @UseGuards(AuthGuard)
  update(@Body() body: Know) {
    return this.knowService.updateById(body.id, body);
  }

  // 从图库选择图片-创建识图
  @Put('addCorrect')
  @UseGuards(AuthGuard)
  addCorrect(@Body() body: Know) {
    return this.knowService.addCorrectById(body.id);
  }

   // 从图库选择图片-创建识图
   @Put('addError')
   @UseGuards(AuthGuard)
   addError(@Body() body: Know) {
     return this.knowService.addErrorById(body.id);
   }

  // 删除识图
  @Delete('delete')
  @UseGuards(AuthGuard)
  delete(@Query('id') id: number) {
    return this.knowService.deleteById(id);
  }
}
