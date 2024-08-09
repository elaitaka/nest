import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.reposotiry';
import { mockAllUsers, mockWrongUserId } from '../utils/test-utils';

class MockedModel {
  constructor(private data) {}
  new = jest.fn().mockResolvedValue(this.data);
  //static save = jest.fn().mockResolvedValue(mockUser);
  static save = jest.fn(); //. mockReturnThis();
  static find = jest.fn().mockReturnThis();
  //static create = jest.fn().mockReturnValue(mockUser);
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id == mockWrongUserId) throw new NotFoundException();
    return this;
  });
}

describe('UsersRepository', () => {
  let userRepo: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: MockedModel,
        },
      ],
    }).compile();

    userRepo = module.get<UsersRepository>(UsersRepository);
    //mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('should return a user doc', async () => {
    //const result = await userRepo.create(mockUser);
  });

  //const expectedUser = await userRepo.create(mockUser);
  //expect(MockedModel.create).toHaveBeenCalledTimes(1);
  //expect(expectedUser).toEqual(mockUser);

  it('should find all orders', async () => {
    const expectedOutput = await userRepo.find();
    expect(MockedModel.find).toHaveBeenCalledTimes(1);
    //expect(MockedModel.save).toHaveBeenCalledTimes(1);
    //expect(MockedModel.save).toBeCalledWith(EXCLUDE_FIELDS);
    expect(expectedOutput).toEqual(mockAllUsers);
  });
});
/*
  describe('Get Order', () => {
    it('should find order by id', async () => {
      const expectedOutput = await userRepo.findOne(mockId);
      expect(MockedModel.findOne).toHaveBeenCalledTimes(1);
      expect(MockedModel.findOne).toBeCalledWith(mockId);
      expect(MockedModel.save).toHaveBeenCalledTimes(1);
      expect(MockedModel.save).toBeCalledWith(EXCLUDE_FIELDS);
      expect(expectedOutput).toEqual(mockOrder);
    });

    it('should throw NotFoundException', async () => {
      try {
        await userRepo.findOne(mockIdError);
      } catch (error: any) {
        expect(error.message).toEqual('Not Found');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
  */
// ... unit test for update and delete functionality will have similar implementation

/*
  it('should retrieve cats from the database', async () => {
    const mockUsers: User[] = [{
        email: 'Catty',
        userId: '1',
        name: 'mizy',
      },
      {
        email: 'Mitzy',
        userId: '4',
        name: 'mizy',
    }];
    database.find.mockResolvedValue(mockUsers);

   // const cats = await catsService.getAllCats();

   // expect(database.getCats).toHaveBeenCalled();
   // expect(cats).toEqual(mockCats);
  });
*/
