import { Inject, Injectable } from '@nestjs/common';
import {
  CreateForAllNotifyDto,
  CreateForOneNotifyDto,
  CreateLikeNotifyDto,
} from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotifyService {
  constructor(@Inject('NOTIFY_SERVICE') private readonly notifyService: ClientProxy){}

  createOne(payload: CreateForOneNotifyDto) {
    return this.notifyService.send('send-one', payload);
  }

  createAll(payload: CreateForAllNotifyDto) {
    return this.notifyService.send('send-all', payload);
  }

  createLike(payload: CreateLikeNotifyDto) {
    return this.notifyService.send('like', payload);
  }

  createUnlike(payload: CreateLikeNotifyDto) {
    return this.notifyService.send('unlike', payload);
  }

  findAll() {
    return this.notifyService.send('all-notify', {});
  }

  findOne(id: string, userId: string) {
    const data = {id, userId}
    return this.notifyService.send('one-notife', data);
  }

  findOnePrivate(id: string) {
    return this.notifyService.send('private-notife', id);
  }
}
