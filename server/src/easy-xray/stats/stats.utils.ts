import { ParsingError } from '@common/errors/parsing.error';
import { EXECUTABLE_FILENAME } from '../easy-xray.consts';
import { EasyXrayCommand } from '../easy-xray.enums';
import { shell } from '../easy-xray.shell';
import type { TrafficStatsDto } from './dto/traffic-stats.dto';
import type { UserStatsDto } from './dto/user-stats.dto';

export function getStats() {
  return shell.exec(`./${EXECUTABLE_FILENAME} ${EasyXrayCommand.STATS}`);
}

const userStatsRegex = /Downloaded by (.+?):(.*?)\nUploaded by (.+?):(.*?)\n/;

// Regular expression to capture totals with varying units
const totalStatsRegex =
  /Downloaded in total: (.+?)\nUploaded in total: (.+?)\n/;

const ZERO_BYTES = '0 bytes';

function normalizeTrafficAmount(traffic: string) {
  return traffic.replace(/^ul/, '0');
}

export function parseTotalStats(stats: string): TrafficStatsDto {
  const totalMatches = stats.match(totalStatsRegex);
  if (!totalMatches) {
    throw new ParsingError('No total stats found');
  }

  const downloaded = totalMatches[1];
  const uploaded = totalMatches[2];

  return {
    downloaded: normalizeTrafficAmount(downloaded),
    uploaded: normalizeTrafficAmount(uploaded),
  };
}

export function parseUsersStats(stats: string): UserStatsDto[] {
  const result: UserStatsDto[] = [];

  // Extract user stats sections
  let match;
  while ((match = userStatsRegex.exec(stats)) !== null) {
    const [, user, downloaded, , uploaded] = match;

    // Push user stats to result array
    result.push({
      user: user.split('@')[0],
      stats: {
        downloaded: downloaded || ZERO_BYTES,
        uploaded: uploaded || ZERO_BYTES,
      },
    });

    // Update the stats to search for the next match
    stats = stats.substring(match.index + match[0].length);
  }

  return result;
}
