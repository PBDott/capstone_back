import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KakaoModule } from './kakao/kakao.module';
import { PrismaModule } from './prisma.module';
import { ClubModule } from './club/club.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [AuthModule, UserModule, KakaoModule, PrismaModule, ClubModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
