import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './repositories/chat.repository';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway],
})
export class ChatModule {}