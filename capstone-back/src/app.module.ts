import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [TradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
