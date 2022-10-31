import { UsersService } from './../users/users.service';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly TasksService: TasksService,
  ) {}

  @Post('create')
  async createTask(
    @Body('description') description: string,
    @Body('author') author: string,
    @Req() request: Request,
  ) {
    const cookie = request.cookies['jwt'];
console.log(cookie)
    this.TasksService.createTask({ description, author });
    return { status: 'success' };
  }
}
