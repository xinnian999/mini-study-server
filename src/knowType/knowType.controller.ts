import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { KnowTypeService } from './knowType.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest } from 'src/interface';

@Controller('knowType')
export class KnowTypeController {
  constructor(private readonly knowTypeService: KnowTypeService) {}

  // 获取用户信息
  @UseGuards(AuthGuard)
  @Get('list')
  list(@Request() req: AuthRequest) {
   return this.knowTypeService.findAll(req.user.userId);
  }
}
