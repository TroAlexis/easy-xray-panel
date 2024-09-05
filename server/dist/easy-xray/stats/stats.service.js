"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const stats_repository_1 = require("./stats.repository");
let StatsService = class StatsService {
    constructor(statsRepository) {
        this.statsRepository = statsRepository;
    }
    getTotalStats() {
        return this.statsRepository.getTotalStats();
    }
    getUsersStats() {
        return this.statsRepository.getUsersStats();
    }
    resetStats() {
        const result = this.statsRepository.resetStats();
        if (!result.includes('reset successfully')) {
            throw new common_1.InternalServerErrorException('Failed to reset stats');
        }
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stats_repository_1.StatsRepository])
], StatsService);
//# sourceMappingURL=stats.service.js.map