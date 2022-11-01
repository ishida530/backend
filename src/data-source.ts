import { Task } from 'src/tasks/tasks.entity';
import { User } from './users/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
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
});
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
