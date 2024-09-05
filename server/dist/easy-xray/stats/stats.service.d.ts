import { StatsRepository } from './stats.repository';
export declare class StatsService {
    private statsRepository;
    constructor(statsRepository: StatsRepository);
    getTotalStats(): import("./stats.types").TrafficStats;
    getUsersStats(): import("./stats.types").UserStats[];
    resetStats(): void;
}
