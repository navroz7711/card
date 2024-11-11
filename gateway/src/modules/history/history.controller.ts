import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardAuth } from 'src/common/guards';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { QueryDto } from './dto/query.dto';

@UseGuards(GuardAuth)
@ApiBearerAuth()
@ApiTags('History')
@Controller({ version: '1', path: 'history' })
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Req() req: Request, 
    @Query() query: QueryDto, 
  ) {
    const user = req.user as { id: string }; 
    return this.historyService.findAll(user.id, +query.page, +query.limit, query.action);
  }
}
