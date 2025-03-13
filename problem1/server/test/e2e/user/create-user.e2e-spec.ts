import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('POST /users - 유저 생성', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
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
    console.log(response2.body);
  });
});
