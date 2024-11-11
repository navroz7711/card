import { BadRequestException, ForbiddenException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto, UpdateAuthDto } from './dto';
import { PrismaService } from 'src/prisma';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '@config';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ){}
  async register(payload: RegisterAuthDto) {

    const user = await this.prisma.user.findUnique({where: {phone: payload.phone}})

    if(user)
      return new BadRequestException('User already exsist!!!') 

    payload.password = await hash(payload.password, 12)
    
    const newUser = await this.prisma.user.create({data: {
      phone: payload.phone,
      password: payload.password,
    }})

    const tokens = await this.getTokens(newUser.id, newUser.phone);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async login(payload: RegisterAuthDto) {
    const user = await this.prisma.user.findUnique({where: {phone: payload.phone}})

    if(!user)
      return new ForbiddenException('Incorrect phone or password!!!')

    const check = await compare(payload.password, user.password)

    if(!check)
      return new ForbiddenException('Incorrect phone or password!!!')

    const tokens = await this.getTokens(user.id, user.phone);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: null,
      },
    });

    await this.redis.del(`user:${userId}:at`)
    return null;
  }

  async refresh(payload: {userId: string, rt: string}) {
    const user = await this.prisma.user.findUnique({ where: { id: payload.userId } });

    if(!user)
      return new ForbiddenException('Access Denied')

    const rtCheck = await compare(payload.rt, user.hashedRt)

    if(!rtCheck)
      return new ForbiddenException('Access Denied')

    await this.redis.del(`user:${payload.userId}:at`)

    const tokens = await this.getTokens(user.id, user.phone);    
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async checking(token: string) {
    try {      
      const verify = await this.jwt.verifyAsync(token, {
        secret: appConfig.atSecret,
      });
  
      const storedTokenHash = await this.redis.get(`user:${verify.sub}:at`);
  
      if (!storedTokenHash) {
        return false;
      }
      
      const isTokenValid = await compare(token, storedTokenHash);
  
      return isTokenValid ? verify : false; 
    } catch (error) {
      return false;
    }
  }

  async remote(userId: string){
    await this.prisma.user.delete({where: {id: userId}})

    return null;
  }
  
  async update(payload: UpdateAuthDto) {
    const user = await this.prisma.user.findUnique({where: {id: payload.userId}})

    if(!user)
      return new BadRequestException('User not found!!!')

    const userPhone = await this.prisma.user.findUnique({where: {phone: payload.phone}})

    const hash = await this.hashing(payload.password)

    if(userPhone)
      return new BadRequestException('User already exsist!!!')

    const data = await this.prisma.user.update({
      where: {
        id: payload.userId
      }, 
      data: {
        phone: payload.phone, 
        password: hash,
      }})

      
      
      const tokens = await this.getTokens(data.id, payload.phone);    
      await this.updateRtHash(user.id, tokens.refresh_token);
      await this.redis.del(`user:${payload.userId}:at`)
    return tokens;
  }

  async hashing(pass: string) {
    return hash(pass, 12);
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    if (!userId || !rt) {
      throw new BadRequestException('Invalid userId or refresh token');
    }
  
    try {
      const hash = await this.hashing(rt);
  
      await this.prisma.user.update({
        where: { id: userId },
        data: { hashedRt: hash },
      });
    } catch (error) {
      console.error('Failed to update refresh token hash:', error);
      throw new InternalServerErrorException('Could not update refresh token hash');
    }
  }
  

  async getTokens(userId: string, phone: string) {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          phone,
        },
        {
          secret: appConfig.atSecret,
          expiresIn: 60 * 15,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          phone,
        },
        {
          secret: appConfig.rtSecret,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    const hashAt = await this.hashing(at)

    await this.redis.set(`user:${userId}:at`, hashAt, 'EX', 60 * 15)

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
