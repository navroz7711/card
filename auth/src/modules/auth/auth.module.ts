import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
      return new Redis({
        host: 'localhost',
        port: 6379,
      })
    }
  }],
  exports: ['REDIS_CLIENT']
})
export class AuthModule {}
