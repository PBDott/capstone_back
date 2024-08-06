import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  controllers: [MemberController],
  providers: [MemberService, MemberController],
})
export class MemberModule {}
