import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('list')
  async list() {
    return this.userService.findAll()
  }

  @Post('create')
  async create(@Body() body: User) {
    try {
      const res = await this.userService.create(body)

      return {
        errno: 0,
        data: res
      }
    } catch (e) {
      return e
    }
  }

  @Post('login')
  async login(@Body() body: User) {
    const res = await this.userService.findOne(body.username, body.password)

    return {
      errno: res ? 0 : 1,
      data: res
    }
  }
}