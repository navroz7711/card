import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyService } from './notify.service';
import { CreateForAllNotifyDto, CreateForOneNotifyDto, CreateLikeNotifyDto, GetOneDto } from './dto';


@Controller()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @MessagePattern('send-one')
  createOne(@Payload() payload: CreateForOneNotifyDto) {
    return this.notifyService.createOne(payload);
  }

  @MessagePattern('send-all')
  createAll(@Payload() payload: CreateForAllNotifyDto) {
    return this.notifyService.createAll(payload);
  }

  @MessagePattern('like')
  createLike(@Payload() payload: CreateLikeNotifyDto) {
    return this.notifyService.createLike(payload);
  }

  @MessagePattern('unlike')
  createUnlike(@Payload() payload: CreateLikeNotifyDto) {
    return this.notifyService.createUnlike(payload);
  }

  @MessagePattern('all-notify')
  findAll() {
    return this.notifyService.findAll();
  }

  @MessagePattern('one-notife')
  findOne(@Payload() payload: GetOneDto) {
    return this.notifyService.findOne(payload);
  }

  @MessagePattern('private-notife')
  findOnePrivate(@Payload() id: string) {
    return this.notifyService.findOnePrivate(id);
  }
}
