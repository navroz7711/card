import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userid: string) {
    const data = await this.prisma.balance.findFirst({ where: { userId: userid } });
    
    if (!data) {
      throw new BadRequestException('Balance not found!!!');
    }

    return data;

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(data);
    //   }, 2000); 
    // });
  }
}

