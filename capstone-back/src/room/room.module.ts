import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './repositories/room.repository';
import { PrismaModule } from 'src/prisma.module';
import { ClubModule } from 'src/club/club.module';
import { TradeModule } from 'src/trade/trade.module';
import { RoomParticipantRepository } from './repositories/room-participant.repository';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [PrismaModule, ClubModule, TradeModule, ChatModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, RoomParticipantRepository],
})
export class RoomModule { }
