import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const twoFactorSecret = authenticator.generateSecret();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        fullName: dto.fullName,
        passwordHash,
        role: UserRole.USER,
        twoFactorSecret,
        accounts: {
          create: [
            { currency: 'KZT', balance: 350000, dailyDebitLimit: 500000, dailyCreditLimit: 500000 },
            { currency: 'USD', balance: 1200, dailyDebitLimit: 3000, dailyCreditLimit: 3000 },
            { currency: 'EUR', balance: 750, dailyDebitLimit: 2500, dailyCreditLimit: 2500 }
          ]
        }
      },
      include: { accounts: true }
    });

    return {
      id: user.id,
      email: user.email,
      twoFactorSecret,
      message: 'User created. Confirm 2FA setup before production rollout.'
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.twoFactorEnabled) {
      if (!dto.twoFactorCode || !authenticator.verify({ token: dto.twoFactorCode, secret: user.twoFactorSecret })) {
        throw new UnauthorizedException('2FA code is invalid');
      }
    }

    return this.issueTokens(user.id, user.email, user.role);
  }

  async enableTwoFactor(userId: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = authenticator.verify({ token: code, secret: user.twoFactorSecret });
    if (!valid) {
      throw new BadRequestException('Invalid 2FA code');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true }
    });

    return { success: true };
  }

  async rotateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!matches) {
      throw new UnauthorizedException('Refresh token invalid');
    }

    return this.issueTokens(user.id, user.email, user.role);
  }

  private async issueTokens(userId: string, email: string, role: UserRole) {
    const payload = { sub: userId, email, role };
    const accessToken = this.signJwt(payload, process.env.JWT_ACCESS_SECRET || 'dev-access', process.env.JWT_ACCESS_TTL || '15m');
    const refreshToken = this.signJwt(payload, process.env.JWT_REFRESH_SECRET || 'dev-refresh', process.env.JWT_REFRESH_TTL || '7d');

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
        refreshTokenHash: await bcrypt.hash(refreshToken, 10)
      }
    });

    return { accessToken, refreshToken };
  }

  private signJwt(payload: Record<string, string>, secret: string, expiresIn: string) {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn
    });
  }
}
