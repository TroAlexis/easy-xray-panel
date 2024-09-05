import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EXECUTABLE_FILENAME } from './easy-xray.consts';
import { EasyXrayCommand } from './easy-xray.enums';
import { shell } from './easy-xray.shell';

@Injectable()
export class EasyXrayService {
  isRunning() {
    const result = shell.exec('pgrep xray').stdout;
    return !!result;
  }
  upgrade() {
    const result = shell.exec(
      `./${EXECUTABLE_FILENAME} ${EasyXrayCommand.UPGRADE}`,
    );
    if (!result.includes('xray upgraded')) {
      throw new InternalServerErrorException('Failed to upgrade xray');
    }
  }
}
