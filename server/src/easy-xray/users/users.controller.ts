import { QueryArray } from '@common/decorators/query-array.decorator';
import { ApiTag } from '@common/enums/api-tag.enum';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags(ApiTag.EASY_XRAY)
@Controller()
export class EasyXrayUsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  add(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.add(...names);
  }

  @Post('suspend')
  suspend(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.suspend(...names);
  }

  @Post('resume')
  resume(
    @QueryArray('names', new ParseArrayPipe({ items: String, separator: ',' }))
    names: string[],
  ) {
    return this.usersService.resume(...names);
  }

  @Delete()
  delete(
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
