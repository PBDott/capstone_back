import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { KakaoLoginDto } from './dto/kakao-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao-login')
  async kakaoLogin(@Body() body: KakaoLoginDto, @Res() res: Response) {
    const { kakaoId, email } = body;
    let user = await this.authService.getUserByKakaoIdAndEmail(kakaoId, email);

    if (user) {
      const token = await this.authService.generateJwtToken(user.kakaoId);

      res.json({
        message: '로그인 성공',
        needsRegister: false,
        token,
        userData: user,
      });
    } else {
      res.json({
        message: '회원가입 필요',
        needsRegister: true,
      });
    }
  }

  @Post('register')
  async register(
    @Body() registerUserData: RegisterUserDto,
    @Res() res: Response,
  ) {
    try {
      const newUser = await this.authService.registerUser(registerUserData);
      const token = await this.authService.generateJwtToken(newUser.kakaoId);

      res.status(201).json({
        message: '회원가입 및 로그인 성공',
        token: token,
        userData: newUser,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({
        message: '회원가입 실패',
        error: error.message || '서버 오류 발생',
      });
    }
  }
}
