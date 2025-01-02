import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);

    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException('密码错误');
    }

    const payload = { userId: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string): Promise<any> {
    try {
      await this.userService.create({ username, password: pass });
      return {
        message: 'success',
        messageText: '注册成功',
      };
    } catch {
      throw new HttpException('用户名已存在', HttpStatus.CONFLICT);
    }
  }

  async getUserInfo(userId: number): Promise<any> {
    const userInfo = await this.userService.findOneByUserId(userId);

    delete userInfo.password;

    return userInfo;
  }

  async setUserInfo(userId: number, info: User): Promise<any> {
    delete info.password;
    delete info.id;

    return await this.userService.updateUserByUserId(userId, info);
  }
}
