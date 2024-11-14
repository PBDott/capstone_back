import { Module } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { ClubAdminController } from './club-admin.controller';
import { ClubAdminRepository } from './repositories/club-admin.repository';

@Module({
  controllers: [ClubAdminController],
  providers: [ClubAdminService, ClubAdminRepository],
})
export class ClubAdminModule {}
