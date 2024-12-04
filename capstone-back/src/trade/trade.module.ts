import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PrismaModule } from 'src/prisma.module';
import { TradeRepository } from './repositories/trade.repository';
import { ImageHandlerModule } from 'src/imageHandler/imageHandler.module';

@Module({
  imports: [PrismaModule, ImageHandlerModule],
  controllers: [TradeController],
  providers: [TradeService, TradeRepository],
  exports: [TradeService],
})
export class TradeModule { }
