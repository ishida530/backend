import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

import { Repository } from 'typeorm';
import { Iuser } from 'src/interface/users';
import { AppDataSource } from 'src/data-source';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Iuser): Promise<User> {
    console.log(data);
    return await this.userRepository.save(data);
  }

  async getUsers(): Promise<User[]> {
      return await this.userRepository.find();
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async setRole(id: number) {
    const result = AppDataSource.createQueryBuilder()
      .update(User)
      .set({ role: 'supervisor' })
      .where('id = :id', { id: id })
      .execute();
    console.log(result);
    return result;
  }
}
