import { userProviders } from './users.providers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {JwtModule} from "@nestjs/jwt";
import { DatabaseModule } from 'src/database/database.modile';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
}),DatabaseModule
],
  controllers: [UsersController],
  providers: [...userProviders ,UsersService],
})
export class UsersModule {}
