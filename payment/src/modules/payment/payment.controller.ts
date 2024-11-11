import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { CreateMinusPaymentDto, CreatePlusPaymentDto } from './dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('plus')
  createPlus(@Payload() createPaymentDto: CreatePlusPaymentDto) {
    return this.paymentService.createPlus(createPaymentDto);
  }

  @MessagePattern('minus')
  createMinus(@Payload() createPaymentDto: CreateMinusPaymentDto) {
    return this.paymentService.createMinus(createPaymentDto);
  }

  @MessagePattern('status')
  findOneStatus(@Payload() id: string) {
    return this.paymentService.findOneStatus(id);
  }
}
