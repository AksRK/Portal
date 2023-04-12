import {
  Body,
  Controller,
  Get,
  Post,
  Req, Res, UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import {RefreshTokenGuard} from "../common/guards/refreshToken.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(
      @Body() data: AuthDto,
      @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(data, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response
  ) {
    const userId = req.user['sub'];
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken, res);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('check')
  checkAuth(@Req() req: Request) {
    return {auth: true}
  }
}