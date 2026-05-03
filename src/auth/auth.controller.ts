import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

type AuthRequest = Request & {
  user: {
    sub: string;
    email: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return { message: 'Login successful' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req: AuthRequest) {
    return this.authService.getFullUser(req.user.email);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }
}
