import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradeModule } from './trade/trade.module';
import { AuthModule } from './auth/auth.module';
import { ClubModule } from './club/club.module';
import { AdminModule } from './admin/admin.module';
import { BoardModule } from './board/board.module';
import { ClubAdminModule } from './club-admin/club-admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TradeModule, AuthModule, ClubModule, AdminModule, BoardModule, ClubAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}