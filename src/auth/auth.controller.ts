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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';
import { AuthRequest } from 'src/interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from 'src/utils';

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
  getProfile(@Request() req: AuthRequest) {
    return this.authService.getUserInfo(req.user.userId);
  }

  // 更新用户信息
  @UseGuards(AuthGuard)
  @Put('updateUserInfo')
  updateUserInfo(@Request() req: AuthRequest, @Body() body: User) {
    return this.authService.setUserInfo(req.user.userId, body);
  }

  // 更新用户头像
  @UseGuards(AuthGuard)
  @Post('updateUserAvatar')
  @UseInterceptors(FileInterceptor('file')) // 将name为file的文件拦截下来
  updateUserAvatar(
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.uploadUserAvatar(userId, file);
  }
}
