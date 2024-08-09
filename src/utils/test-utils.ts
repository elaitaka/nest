import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';

export const mockUserId = '1';
export const mockWrongUserId = 'wrongId';

export const mockUserDto: CreateUserDto = {
  name: 'karl',
  email: 'karl@gmail.com',
};

export const mockAllUsers: User[] = [
  {
    userId: '1',
    name: 'karl',
    email: 'karl@gmail.com',
  },
  {
    userId: '2',
    name: 'henrik',
    email: 'henrik@gmail.com',
  },
];

export const mockUser: User = {
  userId: '1',
  name: 'karl',
  email: 'karl@gmail.com',
};
