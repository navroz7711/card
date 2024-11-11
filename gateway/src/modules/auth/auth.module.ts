import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({}),
    HttpModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: async (config: ConfigService) => ({
          options: {
            host: await config.get('auth.host'),
            port: await config.get('auth.port'),
          },
          transport: Transport.TCP, 
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
