import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterAuthDto, UpdateAuthDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  register(@Payload() payload: RegisterAuthDto) {
    
    return this.authService.register(payload);
  }

  @MessagePattern('login')
  login(@Payload() payload: RegisterAuthDto) {
    return this.authService.login(payload);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern('logout')
  logout(@Payload() userId: string) {
    return this.authService.logout(userId);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern('refresh')
  refresh(@Payload() payload: {userId: string, rt: string}) {
  return this.authService.refresh(payload);
}

  @MessagePattern('update')
  update(@Payload() payload: UpdateAuthDto) {
    return this.authService.update(payload);
  }

  @MessagePattern('check')
  checking(@Payload() token: string) {  
    return this.authService.checking(token);
  }

  @MessagePattern('del')
  remote(@Payload() id: string) { 
    return this.authService.remote(id);
  }
}
