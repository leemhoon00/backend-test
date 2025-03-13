import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequest } from '../request/user.request';
import { UserService } from 'src/provider/user.service';

@ApiTags('/users')
@ApiResponse({ status: 400, description: '유효성 검사 실패' })
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() dto: CreateUserRequest) {
    return await this.userService.create(dto);
  }
}
