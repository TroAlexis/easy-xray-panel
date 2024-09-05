import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EasyXrayController } from './easy-xray.controller';
import { EasyXrayService } from './easy-xray.service';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    StatsModule,
    RouterModule.register([
      {
        module: EasyXrayModule,
        path: 'easy-xray',
        children: [
          { module: StatsModule, path: 'stats' },
          { module: UsersModule, path: 'users' },
        ],
      },
    ]),
    UsersModule,
  ],
  controllers: [EasyXrayController],
  providers: [EasyXrayService],
})
export class EasyXrayModule {}
