import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersRepository } from './../src/users/users.reposotiry';

describe('App (e2e)', () => {
  let app: INestApplication;

  const mockUsersRepository = {
    findOne: jest.fn().mockReturnValue({
      _id: '66b1dd9e559968c8b8766aec',
    }),
    find: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET: users/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockUsersRepository, 'findOne');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer())
        .get('/users/66b1dd9e559968c8b8766aec')
        .expect(200, { _id: '66b1dd9e559968c8b8766aec' });
    });
  });

  /*
  it('/ (GET)', () => {
    request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(({ body }) => {
        expect(body.user).toBeDefined();
        expect(body.user).toContain('66b1dd9e559968c8b8766aec');
      });
  });
  */
});
