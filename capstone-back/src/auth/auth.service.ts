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

  async getUserByKakaoIdAndEmail(kakaoId: string, email: string) {
    return this.authRepository.findUserByKakaoIdAndEmail(kakaoId, email);
  }

  async generateJwtToken(userId: number, kakaoId: string, role: string): Promise<string> {
    const payload = { userId, kakaoId, role };
    return this.jwtService.sign(payload);
  }
}
