import { Module } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { ClubAdminController } from './club-admin.controller';
import { ClubAdminRepository } from './repositories/club-admin.repository';
import { PrismaModule } from 'src/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ClubAdminController],
  providers: [ClubAdminService, ClubAdminRepository],
})

export class ClubAdminModule {}
