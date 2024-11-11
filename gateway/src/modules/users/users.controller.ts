import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardAuth } from 'src/common/guards';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(GuardAuth)
@ApiBearerAuth()
@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request
  ) {
    const user = req.user as {id: string, phone: string}
    return this.usersService.create(createUserDto, user.id, user.phone);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get()
  findOne(@Req() req: Request) {
    
    const user = req.user as { id: string }
    return this.usersService.findOne(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Patch()
  update( 
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string, phone: string }
    return this.usersService.update(user.id, updateUserDto, user.phone);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete()
  remove(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.usersService.remove(user.id);
  }
}
