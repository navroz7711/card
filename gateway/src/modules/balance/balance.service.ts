import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BalanceService {
  constructor(@Inject('BALANCE_SERVICE') private readonly balanceService: ClientProxy){}
  findOne(id: string) {
    return this.balanceService.send('get-balance', id);
  }
}
