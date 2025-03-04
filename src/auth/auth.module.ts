import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from 'src/utils';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    UploadModule('userAvatar'),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
