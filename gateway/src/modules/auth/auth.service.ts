import { Inject, Injectable } from '@nestjs/common';
import { RemoteUserDto, signupAuthDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { updateAuthDto } from './dto/update.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ){}
  register(payload: signupAuthDto){
    return this.authService.send('register', payload)
  }

  login(payload: signupAuthDto){
    return this.authService.send('login', payload)
  }

  update(payload: updateAuthDto){
    return this.authService.send('update', payload)
  }

  logout(userId: string){
    return this.authService.send('logout', userId)
  }

  refresh(userId: string, rt: string){
    const data = { userId, rt }
    return this.authService.send('refresh', data)
  }

  checking(token: string){    
    return this.authService.emit('check', token)
  }

  remote(payload: RemoteUserDto){
    return this.authService.send('del', payload.userId)
  }
}
