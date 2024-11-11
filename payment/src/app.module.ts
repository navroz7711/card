import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PaymentModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
