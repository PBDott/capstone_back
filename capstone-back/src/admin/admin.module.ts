import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma.module';
import { AdminService } from './admin.service';
import { AdminRepository } from './repositories/admin.repository';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [PrismaModule, AuthModule, EmailModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
