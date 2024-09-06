import { Module } from '@nestjs/common';
import { EasyXrayUsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [EasyXrayUsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
