import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';

describe('App (e2e)', () => {
  let app: INestApplication;

  const mockUsersService = {
    getUserById: jest.fn(),
    getUsers: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET:userId)', () => {
    beforeEach(() => {
      jest.spyOn(mockUsersService, 'getUserById');
    });
    request(app.getHttpServer())
      .get('/users/66b1dd9e559968c8b8766aec')
      .expect(200)
      .expect(({ body }) => {
        expect(body.user).toBeDefined();
        expect(body.user).toContain('66b1dd9e559968c8b8766aec');
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
