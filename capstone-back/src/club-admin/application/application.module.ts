import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './repositories/application.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
})

export class ApplicationModule {}
