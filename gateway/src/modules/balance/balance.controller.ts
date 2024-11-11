import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardAuth } from 'src/common/guards';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';

@UseGuards(GuardAuth)
@ApiBearerAuth()
@ApiTags('Balance')
@Controller({ version: '1', path: 'balance' })
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@Req() req: Request) {
    const user = req.user as { id: string }
    return this.balanceService.findOne(user.id);
  }
}
