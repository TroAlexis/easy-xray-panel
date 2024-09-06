import { Environment } from '@common/enums/environment.enum';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async onModuleInit() {
    await this.createAdmin();
  }

  async createAdmin() {
    const userName = this.configService.get(Environment.ADMIN_USERNAME);
    const admin = await this.usersService.findOneByUsername(userName);
    if (admin) {
      console.log('Admin already exists, skipping creation');
      return;
    }

    const password = this.configService.get(Environment.ADMIN_PASSWORD);
    return this.usersService.create({ userName, password });
  }

  async validateUser(
    userName: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findOneByUsername(userName);

    if (!user) {
      return null;
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      throw null;
    }

    return user;
  }

  async verifyToken(token: string): Promise<ProfileDto> {
    return this.jwtService.verify(token, {
      secret: this.configService.get(Environment.JWT_SECRET),
    });
  }

  async login(userName: string): Promise<string> {
    return this.jwtService.sign({ userName });
  }
}
