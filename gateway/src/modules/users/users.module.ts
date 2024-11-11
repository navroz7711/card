import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
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
        name: 'USER_SERVICE',
        useFactory: async (config: ConfigService) => ({
          options: {
            host: await config.get('user.host'),
            port: await config.get('user.port'),
          },
          transport: Transport.TCP, 
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, AtStrategy, RtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
