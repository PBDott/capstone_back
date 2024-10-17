import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(registerUserData: RegisterUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { kakaoId: registerUserData.kakaoId },
      });
  
      if (existingUser) {
        throw new Error('user exist'); 
      }
  
      return await this.prisma.user.create({
        data: { ...registerUserData },
      });
    } catch (error) {
      console.error('db err', error);
      throw error; 
    }
  }
  
  async findUserByKakaoId(kakaoId: string) {
    return await this.prisma.user.findFirst({
      where: { kakaoId: kakaoId },
    });
  }

  async findUserByKakaoIdAndEmail(kakaoId: string, email: string) {
    return await this.prisma.user.findFirst({
      where: { kakaoId: kakaoId, email: email },
    });
  }
}
