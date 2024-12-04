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
import { AppResponseModule } from './app-response/app-response.module';
import { UserModule } from './club-admin/user/user.module';
import { ReceiptModule } from './club-admin/receipt/receipt.module';
import { RoomModule } from './room/room.module';
import { ChatModule } from './chat/chat.module';
import { CalendarModule } from './club-admin/calendar/calendar.module';
import { ImageHandlerModule } from './imageHandler/imageHandler.module';
import { UserModule as UserModule_ } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TradeModule,
    AuthModule,
    ClubModule,
    AdminModule,
    BoardModule,
    ClubAdminModule,
    AppResponseModule,
    UserModule,
    ReceiptModule,
    RoomModule,
    ChatModule,
    CalendarModule,
    ImageHandlerModule,
    UserModule_
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
