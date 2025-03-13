import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequest } from '../request/user.request';

@ApiTags('/users')
@ApiResponse({ status: 400, description: '유효성 검사 실패' })
@Controller('users')
export class UserController {
  @Post()
  create(@Body() dto: CreateUserRequest) {
    console.log(dto);
  }
}
