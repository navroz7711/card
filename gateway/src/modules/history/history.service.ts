import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Action } from './dto/query.dto';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('HISTORY_SERVICE') private readonly historyService: ClientProxy,
  ) {}

  async findAll(
    id: string, 
    page: number = 1, 
    limit: number = 10, 
    action?: Action
  ) {
    return this.historyService.send('get-history', { id, page, limit, action });
  }
}
