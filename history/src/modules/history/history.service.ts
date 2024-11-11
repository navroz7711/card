import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(id: string, page: number, limit: number, action?: string) {
    try {
      const skip = (page - 1) * limit;

    const filters: any = {
      userId: id,
    };

    if (action) {
      filters.action = action;
    }

    const [data, total] = await Promise.all([
      this.prisma.history.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.history.count({
        where: filters,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    } catch (error) {
      return new InternalServerErrorException()
    }
  }
}
