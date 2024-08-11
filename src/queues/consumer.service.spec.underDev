import { Test, TestingModule } from '@nestjs/testing';

import { ConsumerService } from './consumer.service';
import { MockAmqpConnection } from '../utils/MockAmqpConnection';
import { EmailService } from '../email/email.service';
import amqp from 'amqp-connection-manager';

class MockedEmailService {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
}

describe('UserService', () => {
  let service: ConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        {
          provide: EmailService,
          useValue: MockedEmailService,
        },
        {
          provide: amqp.connect,
          useClass: MockAmqpConnection,
        },
      ],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  
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
    */
});
