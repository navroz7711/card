import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ){}
  async create(payload: CreateUserDto) {    
    const findUser = await this.prisma.user.findUnique({where: {id: payload.userId}})

    if(findUser)
      return new BadRequestException('User already exist!!!')

    const find = await this.prisma.user.findFirst({where: {phone: payload.phone}})

    if(find)
      return new BadRequestException('User already exist!!!')

    await this.prisma.user.create({
      data: {
        id: payload.userId, 
        fullname: payload.fullname, 
        phone: payload.phone, 
        dateOfBirth: payload.dateOfBirth
      }})
    
    await this.prisma.balance.create({data: {userId: payload.userId}})
     
    return null;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: {id}})
    if(!user)
      return new BadRequestException('User not found!!!')
    return user;
  }

  async update(payload: UpdateUserDto) {
    const findUser = await this.prisma.user.findUnique({where: {id: payload.id}})

    if(!findUser)
      return new BadRequestException('User not found!!!')

    await this.prisma.user.update({where: {id: payload.id}, data: {
      fullname: payload.fullname,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone
    }})

    return null;
  }

  async remove(id: string) {
    const findUser = await this.prisma.user.findUnique({where: {id}})

    if(!findUser)
      return new BadRequestException('User not found!!!')

    await this.prisma.user.delete({where: {id}})
    return null;
  }
}
