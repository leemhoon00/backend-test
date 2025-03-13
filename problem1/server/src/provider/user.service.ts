import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import type { CreateUserRequest } from 'src/presentation/request/user.request';
import * as argon2 from 'argon2';
import { DuplicateError } from 'src/core/error/duplicate.error';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create({ name, email, password }: CreateUserRequest) {
    const hashedPassword = await argon2.hash(password);
    try {
      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (e) {
      if (e instanceof DuplicateError) {
        if (e.resource === 'USER' && e.field === 'email')
          throw new HttpException('Email already exists', 409);
      }
      throw e;
    }
  }
}
