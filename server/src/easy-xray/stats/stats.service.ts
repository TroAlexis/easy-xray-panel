import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StatsRepository } from './stats.repository';

@Injectable()
export class StatsService {
  constructor(private statsRepository: StatsRepository) {}
  getTotal() {
    return this.statsRepository.getTotal();
  }

  getUsersStats() {
    return this.statsRepository.getUsersStats();
  }

  reset() {
    const result = this.statsRepository.reset();

    if (!result.includes('reset successfully')) {
      throw new InternalServerErrorException('Failed to reset stats');
    }
  }
}
