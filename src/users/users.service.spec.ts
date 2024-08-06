import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { UsersRepository } from './users.reposotiry';
import { ProducerService } from '../queues/producer.service';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ProducerService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('wrong user-ID should return empty object', async () => {
    const getuser = userService.getUserById('Not Found');

    expect(getuser).toMatchObject({});
  });

  it('return zero objects', async () => {
    const getuser = userService.getUsers();

    expect(getuser).toMatchObject({});
  });
});
