import { Module } from '@nestjs/common';
import { UserController } from 'src/presentation/controller/user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
