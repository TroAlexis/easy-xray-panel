import { EasyXrayService } from './easy-xray.service';
export declare class EasyXrayController {
    private easyXrayService;
    constructor(easyXrayService: EasyXrayService);
    getIsRunning(): boolean;
    upgrade(): void;
}
