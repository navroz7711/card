import { Module } from '@nestjs/common';
import { BalanceModule } from './module/balance/balance.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BalanceModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
