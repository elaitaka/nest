import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';

export const mockId = '1';
export const mockWrongId = '2';

export const mockUser: CreateUserDto = {
  name: 'karl',
  email: 'karl@gmail.com',
};

export const mockUsers: User[] = [
  {
    userId: '1',
    name: 'karl',
    email: 'karl@gmail.com',
  },
];

export const mockAllUser: CreateUserDto = {
  name: 'karl',
  email: 'karl@gmail.com',
};
