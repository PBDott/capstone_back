import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { ClubRepository } from './repositories/club.repository';
import { PrismaModule } from 'src/prisma.module';
import { ImageHandlerModule } from 'src/imageHandler/imageHandler.module';

@Module({
  imports: [PrismaModule, ImageHandlerModule],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
  exports: [ClubService, ClubRepository],
})
export class ClubModule { }
