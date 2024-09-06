import { ApiTag } from '@common/enums/api-tag.enum';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EasyXrayService } from './easy-xray.service';

@ApiTags(ApiTag.EASY_XRAY)
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
