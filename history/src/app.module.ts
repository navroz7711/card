import { Module } from '@nestjs/common';
import { HistoryModule } from './modules/history/history.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HistoryModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
