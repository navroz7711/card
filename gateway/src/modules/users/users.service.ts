import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { appConfig } from '@config';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly httpService: HttpService,
  ){}
  async create(payload: CreateUserDto, userId: string, phone: string) {
    return this.userService.send('create-user', {...payload, userId, phone});
  }

  async findOne(id: string) {
    return this.userService.send('get-one', id);
  }

  async update(id: string, payload: UpdateUserDto, phone: string) {
    const action = await firstValueFrom(this.httpService.patch(`http://localhost:${appConfig.port}/api/v1/auth/update`, {userId: id, phone: payload.phone, password: payload.password}))
    return this.userService.send('update-user', {...payload, id, phone});
  }

  async remove(id: string) {
    const action = await firstValueFrom(this.httpService.post(`http://localhost:${appConfig.port}/api/v1/auth/remote`, {userId: id}))
    return this.userService.send('delete-user', id);
  }
}
