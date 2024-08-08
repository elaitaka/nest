import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { Model, Query } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersRepository } from './users.reposotiry';
import { ProducerService } from '../queues/producer.service';

const mockUser = (
  userId = '1',
  name = 'Karl',
  email = 'karl.lastname@gmail.com',
): User => ({
  userId,
  name,
  email,
});

const mockUserDocument = (mock?: Partial<User>): Partial<UserDocument> => ({
  name: mock?.name || 'Karl',
  _id: mock?.userId || '66b2025b8b50c08d9f7772ef',
  email: mock?.email || 'karl.lastname@gmail.com',
});

const usersArray = [
  mockUser(),
  mockUser('2', 'Erik', 'erik.lastname@gmail.com'),
  mockUser('3', 'Henrik', 'henrik.lastname@gmail.com'),
];

const UserDocumentArray: Partial<UserDocument>[] = [
  mockUserDocument(),
  mockUserDocument({
    userId: '2',
    name: 'Erik',
    email: 'erik.lastname@gmail.com',
  }),
  mockUserDocument({
    userId: '2',
    name: 'Henrik',
    email: 'henrik.lastname@gmail.com',
  }),
];

describe('UserService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ProducerService,
        UsersRepository,
        {
          provide: getModelToken('User'),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    //model = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(UserDocumentArray),
    } as unknown as Query<UserDocument[], UserDocument>);

    const users = await service.getUsers();
    expect(users).toEqual(usersArray);
  });

  
  it('should getOne by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockCatDoc({ name: 'Ventus', id: 'an id' })),
      }),
    );
    const findMockCat = mockCat('Ventus', 'an id');
    const foundCat = await service.getOne('an id');
    expect(foundCat).toEqual(findMockCat);
  });
  it('should getOne by name', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            mockCatDoc({ name: 'Mufasa', id: 'the dead king' }),
          ),
      }),
    );
    const findMockCat = mockCat('Mufasa', 'the dead king');
    const foundCat = await service.getOneByName('Mufasa');
    expect(foundCat).toEqual(findMockCat);
  });
  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'some id',
        name: 'Oliver',
        age: 1,
        breed: 'Tabby',
      }),
    );
    const newCat = await service.insertOne({
      name: 'Oliver',
      age: 1,
      breed: 'Tabby',
    });
    expect(newCat).toEqual(mockCat('Oliver', 'some id', 1, 'Tabby'));
  });
  // jest is complaining about findOneAndUpdate. Can't say why at the moment.
  it.skip('should update a cat successfully', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: lasagna,
          name: 'Garfield',
          breed: 'Tabby',
          age: 42,
        }),
      }),
    );
    const updatedCat = await service.updateOne({
      _id: lasagna,
      name: 'Garfield',
      breed: 'Tabby',
      age: 42,
    });
    expect(updatedCat).toEqual(mockCat('Garfield', lasagna, 42, 'Tabby'));
  });
  it('should delete a cat successfully', async () => {
    // really just returning a truthy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.deleteOne('a bad id')).toEqual({ deleted: true });
  });
  it('should not delete a cat', async () => {
    // really just returning a falsy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.deleteOne('a bad id')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
  */
});
