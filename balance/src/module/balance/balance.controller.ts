import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BalanceService } from './balance.service';

@Controller()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @MessagePattern('get-balance')
  findOne(@Payload() id: string) {
    return this.balanceService.findOne(id);
  }
}
