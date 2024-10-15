import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('kakao-login')
  async kakaoLogin(@Body() data, @Res() res) {
    // data.kakaoId
    // 우리 데이터베이스에 유저  테이블에 data.kakaoId를 갖고 있는 유저가 있는지 확인
    const userExist = this.authService.checkUserExist(data.kakaoId)
    //userExist:boolean 유저 존재하면 true 담김

    // 만약 없으면 새로운 유저이므로 회원가입 시킴
    if (userExist) {
      //토큰 생성후 유저정보와 함께 반환
      const token = await this.authService.generateJwtToken(data.kakaoId);
      const user = await this.authService.getUserByKakaoId(data.kakaoId);
      return res.json({
        message: '로그인 성공',
        token,
        user,
      });
    } else {
      const newUser = await this.authService.registerUser(data.userData);
      const token = await this.authService.generateJwtToken(newUser.kakaoId);

      return res.json({
        message: '회원가입 완료',
        token,
        user: newUser,
      });
    }
  }

  
}
