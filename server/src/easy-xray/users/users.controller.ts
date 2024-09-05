import { QueryArray } from '@common/decorators/query-array.decorator';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  addUsers(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.add(...names);
  }

  @Post('suspend')
  suspendUsers(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.suspend(...names);
  }

  @Post('resume')
  resumeUsers(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.resume(...names);
  }

  @Delete()
  deleteUsers(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.delete(...names);
  }

  @Get('link/:name')
  getLink(@Param('name') name: string) {
    return this.usersService.link(name);
  }
}
