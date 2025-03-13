import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}
