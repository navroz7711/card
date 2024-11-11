import { Inject, Injectable } from '@nestjs/common';
import { CreateMinusPaymentDto, CreatePlusPaymentDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
){}
  createPlus(payload: CreatePlusPaymentDto, userId: string) {
    return this.paymentService.send('plus', {...payload, userId});
  }

  createMinus(payload: CreateMinusPaymentDto, userId: string) {
    return this.paymentService.send('minus', {...payload, userId});
  }

  findOneStatus(id: string) {
    return this.paymentService.send('status', id);
  }
}
