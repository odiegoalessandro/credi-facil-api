import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { UserPayload } from './types/user.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: AuthLoginDto) {
    const user = await this.userService.findOneByUsername(loginDto.username);
    const isValidPassword = compareSync(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('usuario ou senha incorretos');
    }

    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      token,
      refreshToken,
    };
  }

  async refresh(token: string) {
    const { exp, ...payload }: UserPayload =
      await this.jwtService.decode(token);

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '20m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
