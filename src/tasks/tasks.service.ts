import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Itask } from 'src/interface/task';
import { User } from 'src/users/user.entity';

import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    
  ) {}

//   async createTask(task: Itask):Promise<Task> {
//     return this.taskRepository.save(task);
//   }

  async createTask(data: Itask): Promise<Task> {
    console.log(data);
    return await this.taskRepository.save(data);
  }
}
