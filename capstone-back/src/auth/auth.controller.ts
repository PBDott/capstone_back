import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('kakao-login')
  async kakaoLogin(@Body() kakaoLoginData:KakaoLoginDto, @Res() res: Response) {
    const userExist =  await this.authService.checkUserExist(kakaoLoginData.kakaoId);

    if (userExist) {
      const token = await this.authService.generateJwtToken(kakaoLoginData.kakaoId);
      const user = await this.authService.getUserByKakaoId(kakaoLoginData.kakaoId);
      return res.json({
        message: '로그인 성공',
        token,
        user,
      });
    } else {
      const newUser = await this.authService.registerUser(kakaoLoginData);
      const token = await this.authService.generateJwtToken(newUser.kakaoId);

      return res.json({
        message: '회원가입 완료',
        token,
        user: newUser,
      });
    }
  }
}
