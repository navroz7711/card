import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateForAllNotifyDto, CreateForOneNotifyDto, CreateLikeNotifyDto, GetOneDto } from './dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class NotifyService {
  constructor(private readonly prisma: PrismaService){}

  async createOne(payload: CreateForOneNotifyDto) {
    try {
      const data = await this.prisma.notifyOne.create({data: {
        message: payload.message,
        userId: payload.userId,
        status: 'sent',
      }})

      return data.id;
    } catch (error) {
      const data = await this.prisma.notifyOne.create({data: {
        message: payload.message,
        userId: payload.userId,
        status: 'failed',
      }})
      return new Error(`Notify sending failed: ${error.message}`);
    }
  }

  async createAll(payload: CreateForAllNotifyDto) {
    try {
      const data = await this.prisma.notifyAll.create({data: {
        message: payload.message,
        status: 'sent',
      }})

      return data.id;
    } catch (error) {
      const data = await this.prisma.notifyAll.create({data: {
        message: payload.message,
        status: 'failed',
      }})
      return new Error(`Notify sending failed: ${error.message}`);
    }
  }

  async createLike(payload: CreateLikeNotifyDto) {
    const data = await this.prisma.notifyAll.findUnique({where: {id: payload.id}})

    if(!data) 
      return new BadRequestException('This notify not found!!!')

    await this.prisma.notifyAll.update({where: {id: data.id}, data: {like: data.like + 1}})
    return null;
  }

  async createUnlike(payload: CreateLikeNotifyDto) {
    const data = await this.prisma.notifyAll.findUnique({where: {id: payload.id}})

    if(!data) 
      return new BadRequestException('This notify not found!!!')

    await this.prisma.notifyAll.update({where: {id: data.id}, data: {like: data.like - 1}})
    return null;
  }

  async findAll() {
    const data = await this.prisma.notifyAll.findMany({where: {status: 'sent'}})
    return data;
  }

  async findOne({id, userId}: GetOneDto) {
    const data = await this.prisma.notifyAll.findUnique({ where: { id } });
  
    if (!data) {
      throw new BadRequestException('This notification is not found!');
    }
  
    const userView = await this.prisma.notifyView.findFirst({
      where: { userId, notificationId: id },
    });
  
    if (!userView) {
      await this.prisma.notifyAll.update({
        where: { id },
        data: { view: data.view + 1 }, 
      });
  
      await this.prisma.notifyView.create({
        data: {
          userId,
          notificationId: id,
        },
      });
    }
  
    return data;
  }

  async findOnePrivate(id: string){
    const data = await this.prisma.notifyOne.findMany({where: {userId: id}})
    
    return data;
  }
  
}
