import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StatsRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private statsRepository: StatsRepository) {}
  getTotalStats() {
    return this.statsRepository.getTotalStats();
  }

  getUsersStats() {
    return this.statsRepository.getUsersStats();
  }

  resetStats() {
    const result = this.statsRepository.resetStats();

    if (!result.includes('reset successfully')) {
      throw new InternalServerErrorException('Failed to reset stats');
    }
  }
}
