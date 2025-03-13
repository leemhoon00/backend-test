import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, Matches } from 'class-validator';
import { TrimString } from './helper';

export class CreateUserRequest {
  @ApiProperty({ minLength: 2, maxLength: 50 })
  @TrimString()
  @Length(2, 50)
  name: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, description: '숫자, 문자 최소 하나씩 포함' })
  @TrimString()
  @Length(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}
