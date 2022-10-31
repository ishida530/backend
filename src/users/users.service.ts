import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

import { Repository } from 'typeorm';
import { Iuser } from 'src/interface/users';
import { DataSource } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Iuser): Promise<User> {
    console.log(data);
    return await this.userRepository.save(data);
  }

  // async getUsers(): Promise<User[]> {
  //     return await this.userRepository.find();
  // }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async setRole(data: Iuser, id: number) {
    const { firstname, email, password } = data;

    const result = this.userRepository
      .createQueryBuilder()
      .update(User)
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return (await result).raw[0];
  }
}
