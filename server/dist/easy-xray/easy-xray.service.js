"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyXrayService = void 0;
const common_1 = require("@nestjs/common");
const easy_xray_consts_1 = require("./easy-xray.consts");
const easy_xray_enums_1 = require("./easy-xray.enums");
const easy_xray_shell_1 = require("./easy-xray.shell");
let EasyXrayService = class EasyXrayService {
    isRunning() {
        const result = easy_xray_shell_1.shell.exec('pgrep xray').stdout;
        return !!result;
    }
    upgrade() {
        const result = easy_xray_shell_1.shell.exec(`./${easy_xray_consts_1.EXECUTABLE_FILENAME} ${easy_xray_enums_1.EasyXrayCommand.UPGRADE}`);
        if (!result.includes('xray upgraded')) {
            throw new common_1.InternalServerErrorException('Failed to upgrade xray');
        }
    }
};
exports.EasyXrayService = EasyXrayService;
exports.EasyXrayService = EasyXrayService = __decorate([
    (0, common_1.Injectable)()
], EasyXrayService);
//# sourceMappingURL=easy-xray.service.js.map