import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ){}
  
  async registerUser(registerData: RegisterUserDto) {
    return this.authRepository.registerUser(registerData);
  }

  async getUserByKakaoId(kakaoId: string) {
    return this.authRepository.findUserByKakaoId(kakaoId);
  }

  async generateJwtToken(kakaoId: string): Promise<string> {
    const payload = { kakaoId };
    return this.jwtService.sign(payload);
  }
}
