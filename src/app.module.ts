import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/tasks.entity';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'kanban',
      entities: [User, Task],
      synchronize: true,
      logging: false,
      bigNumberStrings: false,
    }),
    UsersModule,
    TasksModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
