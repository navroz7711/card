import { Controller, Post, Body, Patch, UseGuards, HttpStatus, HttpCode, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Checking, RemoteUserDto, signupAuthDto } from './dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { updateAuthDto } from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: signupAuthDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: signupAuthDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
  const user = req.user as { id: string };
  return this.authService.logout(user.id);
}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request) {
    const user = req.user as { id: string, refreshToken: string }
    return this.authService.refresh(user.id, user.refreshToken);
  }

  @ApiBearerAuth()
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: updateAuthDto,
  ){
    return this.authService.update(dto);
  }

  @ApiExcludeEndpoint()
  @Post('check')
  ckecking(@Body() payload: Checking) {
    const { token } = payload
    return this.authService.checking(token);
  }

  @ApiExcludeEndpoint()
  @Post('remote')
  @HttpCode(HttpStatus.OK)
  remote(@Body() payload: RemoteUserDto) {    
    return this.authService.remote(payload);
  }
}
