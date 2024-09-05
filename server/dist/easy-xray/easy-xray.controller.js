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
exports.EasyXrayController = void 0;
const common_1 = require("@nestjs/common");
const easy_xray_service_1 = require("./easy-xray.service");
let EasyXrayController = class EasyXrayController {
    constructor(easyXrayService) {
        this.easyXrayService = easyXrayService;
    }
    getIsRunning() {
        return this.easyXrayService.isRunning();
    }
    upgrade() {
        return this.easyXrayService.upgrade();
    }
};
exports.EasyXrayController = EasyXrayController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EasyXrayController.prototype, "getIsRunning", null);
__decorate([
    (0, common_1.Post)('upgrade'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EasyXrayController.prototype, "upgrade", null);
exports.EasyXrayController = EasyXrayController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [easy_xray_service_1.EasyXrayService])
], EasyXrayController);
//# sourceMappingURL=easy-xray.controller.js.map