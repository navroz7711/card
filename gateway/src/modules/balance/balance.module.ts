import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from 'src/common/guards/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    JwtModule.register({}), HttpModule,
    SharedModule,
    AuthModule,
    ClientsModule.registerAsync([
    {
      name: 'BALANCE_SERVICE',
      useFactory: async (config: ConfigService) => ({
        options: {
          host: await config.get('bal.host'),
          port: await config.get('bal.port'),
        },
        transport: Transport.TCP, 
      }),
      inject: [ConfigService],
    }
  ]),
],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
