import { ApiTag } from '@common/enums/api-tag.enum';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags(ApiTag.EASY_XRAY)
@Controller()
export class EasyXrayStatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  getTotal() {
    return this.statsService.getTotal();
  }

  @Get('users')
  getUsersStats() {
    return this.statsService.getUsersStats();
  }

  @Post('reset')
  reset() {
    return this.statsService.reset();
  }
}
