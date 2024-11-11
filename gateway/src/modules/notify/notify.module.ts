import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
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
        name: 'NOTIFY_SERVICE',
        useFactory: async (config: ConfigService) => ({
          options: {
            host: await config.get('notify.host'),
            port: await config.get('notify.port'),
          },
          transport: Transport.TCP,
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
