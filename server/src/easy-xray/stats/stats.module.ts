import { Module } from '@nestjs/common';
import { EasyXrayStatsController } from './stats.controller';
import { StatsRepository } from './stats.repository';
import { StatsService } from './stats.service';

@Module({
  controllers: [EasyXrayStatsController],
  providers: [StatsService, StatsRepository],
})
export class StatsModule {}
