import { Module } from '@nestjs/common';
import { NotifyModule } from './modules/notify/notify.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NotifyModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
