import { Injectable } from '@nestjs/common';
import { EXECUTABLE_FILENAME } from '../easy-xray.consts';
import { EasyXrayCommand } from '../easy-xray.enums';
import { shell } from '../easy-xray.shell';
import { getStats, parseTotalStats, parseUsersStats } from './stats.utils';

@Injectable()
export class StatsRepository {
  getTotal() {
    return parseTotalStats(getStats());
  }

  getUsersStats() {
    return parseUsersStats(getStats());
  }

  reset() {
    return shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.STATS} reset`,
    );
  }
}
