import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  findOneByUsername(userName: string) {
    return this.userRepository.findOneBy({ userName });
  }

  async create(user: Pick<UserEntity, 'userName' | 'password'>) {
    const salt = await bcrypt.genSalt(10);

    return this.userRepository.save({
      ...user,
      password: await bcrypt.hash(user.password, salt),
    });
  }
}
