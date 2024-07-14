import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRefreshDto } from './dto/auth.refresh.dto';
import { Public } from './jwt.public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('/refresh')
  @Public()
  async refresh(@Body() authRefreshDto: AuthRefreshDto) {
    return await this.authService.refresh(authRefreshDto.refreshToken);
  }
}
