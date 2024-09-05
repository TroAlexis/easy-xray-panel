import { Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  getTotalStats() {
    return this.statsService.getTotalStats();
  }

  @Get('users')
  getUsersStats() {
    return this.statsService.getUsersStats();
  }

  @Post('reset')
  resetStats() {
    return this.statsService.resetStats();
  }
}
