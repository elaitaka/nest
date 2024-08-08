import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.reposotiry';
import { ProducerService } from '../queues/producer.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { mockUser, mockUsers } from '../utils/test-utils';

export const mockAllUser: CreateUserDto = {
  name: 'karl',
  email: 'karl@gmail.com',
};
const mockId = '1';
const mockIdError = 'error';

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
    return mockUsers;
  });
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {
    if (id == mockIdError) throw new NotFoundException();
    return this;
  });
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id == mockIdError) throw new NotFoundException();
    return mockUser;
  });
  static save = jest.fn().mockResolvedValue(mockUser);
  static remove = jest.fn().mockResolvedValue(mockUser);
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
    expect(MockedUsersRepository.save).toHaveBeenCalledTimes(0);
    expect(user.email).toEqual(expectedOutput.at(0).email);
  });

  
  describe('Get User', () => {
    it('find user by id', async () => {
      const expectedOutput = await service.getUserById(mockId);
      expect(MockedUsersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUser.name).toEqual(expectedOutput.name);
    });
  });
    /*
    it('throw NotFoundException', async () => {
      try {
        await service.getUserById(mockIdError);
      } catch (error: any) {
        expect(error.message).toEqual('Not Found');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
  // ... unit test for update and delete functionality will have similar implementation
*/
});
