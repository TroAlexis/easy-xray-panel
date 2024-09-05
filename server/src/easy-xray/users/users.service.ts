import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  findAll() {
    return this.usersRepository.findAll();
  }

  add(...names: string[]) {
    const result = this.usersRepository.add(...names);

    if (!result) {
      throw new ConflictException('Users already exist');
    }

    return names;
  }

  suspend(...names: string[]) {
    const result = this.usersRepository.suspend(...names);

    if (!result) {
      throw new NotFoundException('No configs found for users');
    }

    return names;
  }

  resume(...names: string[]) {
    const result = this.usersRepository.resume(...names);

    if (!result) {
      throw new NotFoundException("No configs found for users, can't resume");
    }

    return names;
  }

  delete(...names: string[]) {
    const result = this.usersRepository.delete(...names);

    if (!result) {
      throw new NotFoundException('No configs found for users');
    }

    return names;
  }

  link(name: string) {
    const link = this.usersRepository.link(name);

    if (!link) {
      throw new NotFoundException('User not found');
    }

    return link;
  }
}
