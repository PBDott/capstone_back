import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { AdminModule } from './admin/admin.module';
import { BoardModule } from './board/board.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [TradeModule, AuthModule, ClubModule, AdminModule, BoardModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
