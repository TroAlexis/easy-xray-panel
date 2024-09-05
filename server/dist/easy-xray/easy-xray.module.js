"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyXrayModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const easy_xray_controller_1 = require("./easy-xray.controller");
const easy_xray_service_1 = require("./easy-xray.service");
const stats_module_1 = require("./stats/stats.module");
const users_module_1 = require("./users/users.module");
let EasyXrayModule = class EasyXrayModule {
};
exports.EasyXrayModule = EasyXrayModule;
exports.EasyXrayModule = EasyXrayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            stats_module_1.StatsModule,
            core_1.RouterModule.register([
                {
                    module: EasyXrayModule,
                    path: 'easy-xray',
                    children: [
                        { module: stats_module_1.StatsModule, path: 'stats' },
                        { module: users_module_1.UsersModule, path: 'users' },
                    ],
                },
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [easy_xray_controller_1.EasyXrayController],
        providers: [easy_xray_service_1.EasyXrayService],
    })
], EasyXrayModule);
//# sourceMappingURL=easy-xray.module.js.map