import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
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
        name: 'HISTORY_SERVICE',
        useFactory: async (config: ConfigService) => ({
          options: {
            host: await config.get('his.host'),
            port: await config.get('his.port'),
          },
          transport: Transport.TCP,
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
