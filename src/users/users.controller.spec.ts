import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mockUser, mockId } from '../utils/test-utils';

const mockOrderService = {
  createUser: jest.fn().mockReturnValue(mockUser),
  getUsers: jest.fn().mockReturnValue([mockUser]),
  getUserById: jest.fn().mockReturnValue(mockUser),
  delete: jest.fn().mockReturnValue(mockUser),
};

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user data', async () => {
    const expectedOutput = await controller.createUser(mockUser);
    expect(service.createUser).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should find all user data', async () => {
    const expectedOutput = await controller.getUsers();
    expect(service.getUsers).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockUser]);
  });

  it('should find user data by id', async () => {
    const expectedOutput = await controller.getUser(mockId);
    expect(service.getUserById).toHaveBeenCalledTimes(1);
    expect(service.getUserById).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should delete user data by id', async () => {
    const expectedOutput = await controller.remove(mockId);
    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(service.delete).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });
});
