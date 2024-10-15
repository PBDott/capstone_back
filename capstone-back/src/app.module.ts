import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';


@Module({
  imports: [TradeModule, AuthModule, ClubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
