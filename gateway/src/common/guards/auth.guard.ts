import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class GuardAuth implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly auth: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const response = await firstValueFrom(
        this.authService.send('check', token)
      );
      
      
      if (!response) {
        throw new UnauthorizedException('Invalid token payload');
      }

      request['user'] = response;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
