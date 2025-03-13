import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

describe('POST /users - 유저 생성', () => {
  let app: INestApplication;
  let userRepo: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepo = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userRepo.clear();
  });

  it('name이 2~50자가 아니면 400을 반환한다', async () => {
    // when
    const response1 = await request(app.getHttpServer()).post('/users').send({
      name: 'a',
      email: 'john@example.com',
      password: 'securePassword123',
    });

    const response2 = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'a'.repeat(51),
        email: 'john@example.com',
        password: 'securePassword123',
      });

    const response3 = await request(app.getHttpServer()).post('/users').send({
      email: 'john@example.com',
      password: 'securePassword123',
    });

    // then
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
    expect(response3.status).toBe(400);
  });

  it('email 형식이 아니면 400을 반환한다', async () => {
    // when
    const response1 = await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      email: 'INVALID',
      password: 'securePassword123',
    });

    // then
    expect(response1.status).toBe(400);
  });

  it('password가 8자 미만이거나 숫자 문자 최소 하나씩 포함하지 않을경우 400을 반환한다', async () => {
    // when
    const response1 = await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'abc123',
    });

    const response2 = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'a'.repeat(8),
      });

    // then
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('201과 함께 생성된 UserData를 반환한다', async () => {
    // given
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'securePassword123';

    // when
    const { status, body } = await request(app.getHttpServer())
      .post('/users')
      .send({
        name,
        email,
        password,
      });

    // then
    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(Number),
      name,
      email,
      createdAt: expect.any(String),
    });
  });

  it('email이 중복이면 409를 반환한다', async () => {
    // given
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'securePassword123';

    await request(app.getHttpServer()).post('/users').send({
      name,
      email,
      password,
    });

    // when
    const { status } = await request(app.getHttpServer()).post('/users').send({
      name,
      email,
      password,
    });

    // then
    expect(status).toBe(409);
  });
});
