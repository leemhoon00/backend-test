import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserRequest } from '../request/user.request';
import { CreatedUserResponse } from '../response/user.response';
import { UserService } from 'src/provider/user.service';

@ApiTags('/users')
@ApiResponse({ status: 400, description: '유효성 검사 실패' })
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiResponse({ status: 201, type: CreatedUserResponse })
  @ApiResponse({ status: 409, description: '이메일 중복' })
  @Post()
  async create(@Body() dto: CreateUserRequest): Promise<CreatedUserResponse> {
    return await this.userService.create(dto);
  }
}
