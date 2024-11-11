import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {
  authConfig,
  balanceConfig,
  historyConfig,
  notifyConfig,
  paymentConfig,
  userConfig,
} from '@config';
import { UsersModule } from './modules/users/users.module';
import { BalanceModule } from './modules/balance/balance.module';
import { PaymentModule } from './modules/payment/payment.module';
import { NotifyModule } from './modules/notify/notify.module';
import { HistoryModule } from './modules/history/history.module';
import { HttpModule } from '@nestjs/axios';
import Redis from 'ioredis';
// import { RateLimiterMiddleware } from './common/middlewares/rate-limiter.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from './common/guards/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        authConfig,
        userConfig,
        balanceConfig,
        paymentConfig,
        historyConfig,
        notifyConfig,
      ],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    BalanceModule,
    PaymentModule,
    NotifyModule,
    HistoryModule,
    HttpModule,
    SharedModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        });
      },
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RateLimiterMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL }); 
  // }
}
