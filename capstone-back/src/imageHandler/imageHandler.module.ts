import { Module } from '@nestjs/common';
import { ImageHandlerController } from './imageHandler.controller';
import { ImageHandlerService } from './imageHandler.service';
import { ImageHandlerRepository } from './repositories/imageHandler.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImageHandlerController],
  providers: [ImageHandlerService, ImageHandlerRepository],
  exports: [ImageHandlerService],
})
export class ImageHandlerModule {}
