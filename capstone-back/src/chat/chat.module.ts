import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './repositories/chat.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  exports: [ChatService],
})
export class ChatModule { }
