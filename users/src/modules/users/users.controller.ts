import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create-user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('get-one')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('update-user')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('delete-user')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
