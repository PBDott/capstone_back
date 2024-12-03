import { Module } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { ClubAdminController } from './club-admin.controller';
import { ClubAdminRepository } from './repositories/club-admin.repository';
import { PrismaModule } from 'src/prisma.module';
import { ApplicationModule } from './application/application.module';
import { ClubModule } from 'src/club/club.module';

@Module({
  imports: [PrismaModule, ApplicationModule, ClubModule],
  controllers: [ClubAdminController],
  providers: [ClubAdminService, ClubAdminRepository],
})

export class ClubAdminModule {}
