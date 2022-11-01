import {
  Controller,
  Body,
  Post,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('firstname') firstname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      firstname,
      email,
      password: hashedPassword
  });

  delete user.password;

  return user;
  }

  @Post('/getAll')
  async getUsers(){
    return this.userService.getUsers()
  }

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.getUser(email);
    console.log(user);

    if (!user) {
      return { message: 'nie ma takiego uzytkownika' };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { message: 'Nie prawidłowa nazwa użytkownika lub błędne hasło' };
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'succes',
    };
  }

  @Get('/')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      console.log(data);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.getUser(data.email);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
      response.clearCookie('jwt');

      return {
          message: 'success'
      }
  }

  @Post('setRole')
  async setRole(
    @Body('id')id:number
  ){
    const x= this.userService.setRole(1)
    console.log(x)
    return x
  }
}
