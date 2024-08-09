import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UsersRepository } from './users.reposotiry';
import { User } from './schemas/user.schema';
import { ProducerService } from '../queues/producer.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private producerService: ProducerService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      userId: uuidv4,
      email: createUserDto.email,
      name: createUserDto.name,
    });

    const emailData = {
      email: createUserDto.email,
      subject: 'Welcome to Our Community',
      html: `<p>Hello ${createUserDto.name},</p>
      <p>Welcome to our community! Your account is now active.</p>
      <p>Enjoy your time with us!</p>`,
    };
    await this.producerService.addToEmailQueue(emailData);

    return user;
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(userId: string) {
    return this.usersRepository.remove({ userId });
  }
}
