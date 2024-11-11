import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMinusPaymentDto, CreatePlusPaymentDto } from './dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlus(payload: CreatePlusPaymentDto) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const balance = await prisma.balance.findFirst({
          where: { userId: payload.userId },
        });

        if (!balance) {
          return new BadRequestException('Balance not found for user');
        }

        const updatedBalance = await prisma.balance.update({
          where: { id: balance.id },
          data: {
            currentBalance: {
              increment: payload.amount,
            },
          },
          select: {
            id: true,
            currentBalance: true,
          },
        });

        const payment = await prisma.payment.create({
          data: {
            amount: payload.amount,
            currency: payload.currency,
            paymentMethod: payload.paymentMethod,
            status: 'success',
            userId: payload.userId,
          },
        });

        await prisma.history.create({
          data: {
            amount: payload.amount,
            currency: payload.currency,
            paymentMethod: payload.paymentMethod,
            paymentId: payment.id,
            status: payment.status,
            action: 'increment',
            userId: payload.userId,
          },
        });

        return payment.id;
      });
    } catch (error) {
      await this.handleFailedPayment(payload, error);
      return new Error(`Transaction failed: ${error.message}`);
    }
  }

  async createMinus(payload: CreateMinusPaymentDto) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const balance = await prisma.balance.findFirst({
          where: { userId: payload.userId },
        });

        if (!balance) {
          return new BadRequestException('Balance not found for user');
        }

        if (balance.currentBalance < payload.amount) {
          return new BadRequestException('Insufficient balance');
        }

        const updatedBalance = await prisma.balance.update({
          where: { id: balance.id },
          data: {
            currentBalance: {
              decrement: payload.amount,
            },
          },
          select: {
            id: true,
            currentBalance: true,
          },
        });

        const payment = await prisma.payment.create({
          data: {
            amount: payload.amount,
            currency: payload.currency,
            paymentMethod: payload.paymentMethod,
            status: 'success',
            userId: payload.userId,
          },
        });

        await prisma.history.create({
          data: {
            amount: payload.amount,
            currency: payload.currency,
            paymentMethod: payload.paymentMethod,
            status: payment.status,
            action: 'decrement',
            userId: payload.userId,
            paymentId: payment.id,
          },
        });

        return payment.id;
      });
    } catch (error) {
      await this.handleFailedPayment(payload, error);
      return new Error(`Transaction failed: ${error.message}`);
    }
  }

  private async handleFailedPayment(payload: CreatePlusPaymentDto | CreateMinusPaymentDto, error: Error) {
    await this.prisma.payment.create({
      data: {
        amount: payload.amount,
        currency: payload.currency,
        paymentMethod: payload.paymentMethod,
        status: 'failed',
        userId: payload.userId,
      },
    });
  }

  async findOneStatus(id: string) {
    const findStatus = await this.prisma.payment.findUnique({where: {id}})

    if(!findStatus)
      return new BadRequestException('This id not found!!!')

    return findStatus.status;
  }
}
