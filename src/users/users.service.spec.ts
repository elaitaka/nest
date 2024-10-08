import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersRepository } from './users.reposotiry';
import { v4 as uuidv4 } from 'uuid';
import {
  mockUserId,
  mockUser,
  mockWrongUserId,
  mockAllUsers,
} from '../utils/test-utils';
import { ProducerService } from '../queues/producer.service';

class MockedUsersRepository {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
  static create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((userId: uuidv4, email: string, name: string) => {
      return mockUser;
    });
  static find = jest.fn().mockImplementation(() => {
    return mockAllUsers;
  });
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {
    if (id == mockWrongUserId) throw new NotFoundException();
    return this;
  });
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id == mockWrongUserId) throw new NotFoundException();
    return mockUser;
  });
  static remove = jest.fn().mockResolvedValue(mockUser);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MockedProducerService {
  constructor(private _: any) {}
  static addToEmailQueue = jest.fn().mockReturnThis();
}

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: MockedUsersRepository,
        },
        {
          provide: ProducerService,
          useValue: MockedProducerService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create new user', async () => {
    const expectedOutput = await service.createUser(mockUser);
    expect(MockedUsersRepository.create).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('find all users', async () => {
    const user = await service.createUser(mockUser);
    const expectedOutput = await service.getUsers();
    expect(MockedUsersRepository.find).toHaveBeenCalledTimes(1);
    expect(user.email).toEqual(expectedOutput.at(0).email);
  });

  describe('Get User', () => {
    it('find user by id', async () => {
      const expectedOutput = await service.getUserById(mockUserId);
      expect(MockedUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUser.name).toEqual(expectedOutput.name);
    });

    it('throw NotFoundException', async () => {
      try {
        await service.getUserById(mockWrongUserId);
      } catch (error: any) {
        expect(error.message).toEqual('Not Found');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
});
