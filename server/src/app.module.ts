import { Module } from '@nestjs/common';
import { EasyXrayModule } from './easy-xray/easy-xray.module';

@Module({
  imports: [EasyXrayModule],
})
export class AppModule {}
