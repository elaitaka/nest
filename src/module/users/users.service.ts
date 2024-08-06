import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.reposotiry';
import { User } from './schemas/user.schema';


@Injectable()
export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository) { }

  async createUser(email: string, name: string): Promise<User> {
    const user = this.usersRepository.create({
      userId: uuidv4,
      email: email,
      name: name
    })
    return user;
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId })
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
