import { StatsService } from './stats.service';
export declare class StatsController {
    private statsService;
    constructor(statsService: StatsService);
    getTotalStats(): import("./stats.types").TrafficStats;
    getUsersStats(): import("./stats.types").UserStats[];
    resetStats(): void;
}
