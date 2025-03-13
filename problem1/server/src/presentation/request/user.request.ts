import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, Matches } from 'class-validator';
import { TrimString } from './helper';

export class CreateUserRequest {
  @ApiProperty()
  @TrimString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @TrimString()
  @Length(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}
