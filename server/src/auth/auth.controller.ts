import { Cookies } from '@common/decorators/cookies.decorator';
import { Public } from '@common/decorators/public.decorator';
import { Environment } from '@common/enums/environment.enum';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AUTH_COOKIE_NAME } from './auth.const';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}
  @Public()
  @Get('profile')
  async getProfile(@Cookies(AUTH_COOKIE_NAME) token: string | undefined) {
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      return this.authService.verifyToken(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Public()
  @Post('login')
  async login(
    @Body() { userName, password }: LoginDto,
    @Res() response: Response,
  ) {
    const user = await this.authService.validateUser(userName, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.login(user.userName);

    response.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: Number(this.configService.get(Environment.JWT_EXPIRATION_TIME)),
      sameSite: 'strict',
    });

    return response.send({ userName });
  }
}
