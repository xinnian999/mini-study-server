import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException('passwordError');
    }

    const payload = { userId: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserInfo(userId: number): Promise<any> {
    const userInfo = await this.userService.findOneByUserId(userId);

    delete userInfo.password;

    return userInfo;
  }

  async setUserInfo(userId: number, info: User): Promise<any> {
    console.log(info);
    
    delete info.password;
    delete info.id;

    return await this.userService.updateUserByUserId(userId, info);
  }
}
