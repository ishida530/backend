import { User } from './../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column({default:100})
  status: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
