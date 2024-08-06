import { Controller, Get, Header, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get('kakaoLogin')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    res.redirect(url);
  }

  @Get('kakao')
  async getKakaoInfo(@Query('code') code: string) {
    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
    const respose = await this.authService.kakaoLogin(KAKAO_API_KEY, KAKAO_REDIRECT_URI, code);
    return respose;
  }
}