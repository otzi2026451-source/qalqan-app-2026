import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth/refresh'
    });

    return { accessToken: tokens.accessToken };
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (req.headers['x-csrf-token'] !== dto.csrfToken) {
      throw new BadRequestException('CSRF token mismatch');
    }

    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token missing');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh'
    });
    const tokens = await this.authService.rotateRefreshToken(payload.sub, refreshToken);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/api/auth/refresh'
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable')
  enable2fa(@CurrentUser() user: { sub: string }, @Body('code') code: string) {
    return this.authService.enableTwoFactor(user.sub, code);
  }
}
