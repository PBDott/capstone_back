import { Injectable } from '@nestjs/common';
import { ChatRepository } from './repositories/chat.repository';
import { io } from 'src/main';
import { ImageHandlerService } from 'src/imageHandler/imageHandler.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly imageHandlerService: ImageHandlerService,
  ) { }

  async getChats({ roomId, offset, limit }: { roomId: string, offset: number, limit: number }) {
    return this.chatRepository.getChatsByRoomId({ roomId, offset, limit });
  }

  async createChat({ message, userId, roomId, imageId }: { userId: number, roomId: string, message: string | null, imageId: number | null }) {
    const chat = await this.chatRepository.saveChat({ message, userId, roomId, imageId })
    await this.imageHandlerService.attachImagesToChat({ imageId, chatId: chat.id });
    return chat;
  }

  triggerBroadcast({ message, userId, nickname, roomId, imageId }) {
    io.to(roomId).emit('message', { message, userId, nickname, imageId });
    // io.emit('message', { message, roomId, userId, nickname });
  }
}