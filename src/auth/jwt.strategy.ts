import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from './types/user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configSecret: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSecret.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserPayload) {
    const token: string | undefined = req.headers.authorization.split(' ')[0];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const isValidSignature = await this.jwtService.verifyAsync(token, {
      secret: this.configSecret.get<string>('JWT_SECRET'),
    });

    if (!isValidSignature) throw new UnauthorizedException('Invalid token');

    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
