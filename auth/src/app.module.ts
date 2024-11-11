import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
