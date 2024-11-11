import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardAuth } from 'src/common/guards';
import { CreateMinusPaymentDto, CreatePlusPaymentDto } from './dto';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';

@UseGuards(GuardAuth)
@ApiBearerAuth()
@ApiTags('Payment')
@Controller({ version: '1', path: 'payment' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('plus')
  createPlus(
    @Body() payload: CreatePlusPaymentDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string }
    return this.paymentService.createPlus(payload,user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('minus')
  createMinus(
    @Body() payload: CreateMinusPaymentDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string }
    return this.paymentService.createMinus(payload, user.id);
  }

  @Get(':id')
  findOneStatus(@Param('id') id: string) {
    return this.paymentService.findOneStatus(id);
  }
}
