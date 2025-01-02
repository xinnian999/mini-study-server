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
import { KnowTypeService } from './knowType.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/utils/decorator';
import { KnowType } from './knowType.entity';

@Controller('knowType')
export class KnowTypeController {
  constructor(private readonly knowTypeService: KnowTypeService) {}

  // 获取用户的识图类型
  @UseGuards(AuthGuard)
  @Get('list')
  list(@UserId() userId: number) {
    return this.knowTypeService.findAll(userId);
  }

  // 获取识图类型详情
  @UseGuards(AuthGuard)
  @Get('detail')
  detail(@Query('id') id: number) {
    return this.knowTypeService.findOneById(id);
  }

  // 创建用户的识图类型
  @Post('add')
  @UseGuards(AuthGuard)
  add(@UserId() userId: number, @Body() body: KnowType) {
    return this.knowTypeService.create({ ...body, userId });
  }

  // 修改识图类型
  @Put('update')
  @UseGuards(AuthGuard)
  update(@Body() body: KnowType) {
    return this.knowTypeService.updateById(body.id, body);
  }

  // 删除识图类型
  @Delete('delete')
  @UseGuards(AuthGuard)
  delete(@Query('id') id: number) {
    return this.knowTypeService.deleteById(id);
  }
}
