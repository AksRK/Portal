import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
