import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EasyXrayModule } from './easy-xray/easy-xray.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EasyXrayModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../data/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.MODE === 'dev',
    }),
  ],
})
export class AppModule {}
