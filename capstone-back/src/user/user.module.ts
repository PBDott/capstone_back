import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from 'src/prisma.module';
import { ClubModule } from 'src/club/club.module';
import { TradeModule } from 'src/trade/trade.module';
import { ImageHandlerModule } from 'src/imageHandler/imageHandler.module';

@Module({
  imports: [PrismaModule, ClubModule, TradeModule, ImageHandlerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule { }
