import { shell } from '../easy-xray.shell';
import { TrafficStats, UserStats } from './stats.types';
export declare function getStats(): shell.ShellString;
export declare function parseTotalStats(stats: string): TrafficStats;
export declare function parseUsersStats(stats: string): UserStats[];
