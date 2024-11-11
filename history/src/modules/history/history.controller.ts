import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @MessagePattern('get-history')
  findAll(@Payload() payload: { id: string; page: number; limit: number; action?: 'increment' | 'decrement' }) {
     const { id, page, limit, action } = payload;
    return this.historyService.findAll(id, +page, +limit, action);
   }
}
