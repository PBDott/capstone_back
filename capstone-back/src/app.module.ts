import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TradeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
