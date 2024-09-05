import { Controller, Get, Post } from '@nestjs/common';
import { EasyXrayService } from './easy-xray.service';

@Controller()
export class EasyXrayController {
  constructor(private easyXrayService: EasyXrayService) {}

  @Get('status')
  getIsRunning() {
    return this.easyXrayService.isRunning();
  }

  @Post('upgrade')
  upgrade() {
    return this.easyXrayService.upgrade();
  }
}
