import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { DuplicateError } from 'src/core/error/duplicate.error';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(input: CreateInput) {
    try {
      return await this.userRepo.save(input);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)
        throw new DuplicateError('USER', 'email');
      throw e;
    }
  }
}

type CreateInput = {
  name: string;
  email: string;
  password: string;
};
