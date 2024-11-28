import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { ClubRepository } from './repositories/club.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
  exports: [ClubService],
})
export class ClubModule {}
