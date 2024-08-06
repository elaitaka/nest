import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProducerService } from '../queues/producer.service';
import { UsersRepository } from './users.reposotiry';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        ProducerService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockReturnValueOnce('Karl'),
            findOne: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should be created user`, () => {
    const value = () =>
      controller.createUser({
        name: 'Karl',
        email: 'eero.laitakangas@gmail.com',
      });

    expect(value).toBeDefined();
  });
});
