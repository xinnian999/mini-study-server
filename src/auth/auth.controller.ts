import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 登录
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // 注册
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }

  // 获取用户信息
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getUserInfo(req.user.userId);
  }

  // 更新用户信息
  @UseGuards(AuthGuard)
  @Put('updateUserInfo')
  updateUserInfo(@Request() req, @Body() body: User) {
    return this.authService.setUserInfo(req.user.userId, body);
  }
}
