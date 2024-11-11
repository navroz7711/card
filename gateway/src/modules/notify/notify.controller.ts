import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardAuth } from 'src/common/guards';
import { Request } from 'express'
import {
  CreateForAllNotifyDto,
  CreateForOneNotifyDto,
  CreateLikeNotifyDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(GuardAuth)
@ApiBearerAuth()
@ApiTags('Notify')
@Controller({ version: '1.0.0', path: 'notify' })
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('send/one')
  createOne(@Body() createNotifyDto: CreateForOneNotifyDto) {
    return this.notifyService.createOne(createNotifyDto);
  }

  @Post('send/all')
  createAll(@Body() createNotifyDto: CreateForAllNotifyDto) {
    return this.notifyService.createAll(createNotifyDto);
  }

  @Post('like/Click')
  createLike(@Body() createNotifyDto: CreateLikeNotifyDto) {
    return this.notifyService.createLike(createNotifyDto);
  }

  @Post('unlike/Click')
  createUnlike(@Body() createNotifyDto: CreateLikeNotifyDto) {
    return this.notifyService.createUnlike(createNotifyDto);
  }

  @Get()
  findAll() {
    return this.notifyService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const user = req.user as { id: string }
    return this.notifyService.findOne(id, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private/alone')
  findOnePrivate(
    @Req() req: Request,
  ) {
    const user = req.user as { id: string }
    return this.notifyService.findOnePrivate(user.id);
  }
}
