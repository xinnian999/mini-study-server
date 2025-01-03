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

  // 查询识图列表
  @UseGuards(AuthGuard)
  @Get('list')
  list(@Query('typeId') typeId: number) {
    return this.knowService.findAllByTypeId(typeId);
  }

  // 创建查询识图列表
  @Post('add')
  @UseGuards(AuthGuard)
  add(@Body() body: Know) {
    return this.knowService.create(body);
  }
}
