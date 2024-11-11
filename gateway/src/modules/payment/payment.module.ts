import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { SharedModule } from 'src/common/guards/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    JwtModule.register({}), 
    HttpModule,
    SharedModule,
    AuthModule,
    ClientsModule.registerAsync([
    {
      name: 'PAYMENT_SERVICE',
      useFactory: async (config: ConfigService) => ({
        options: {
          host: await config.get('payment.host'),
          port: await config.get('payment.port')
        },
        transport: Transport.TCP,
      }),
      inject: [ConfigService],
    }
  ]) 
  ],
  controllers: [PaymentController],
  providers: [PaymentService, AtStrategy, RtStrategy],
})
export class PaymentModule {}
