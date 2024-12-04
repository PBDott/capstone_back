import { Injectable } from '@nestjs/common';
import { ChatRepository } from './repositories/chat.repository';
import { io } from 'src/main';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
  ) { }

  async getChats({ roomId, offset, limit }: { roomId: string, offset: number, limit: number }) {
    return this.chatRepository.getChatsByRoomId({ roomId, offset, limit });
  }

  async createChat({ message, userId, roomId, imageId }: { userId: number, roomId: string, message: string | null, imageId: number | null }) {
    return this.chatRepository.saveChat({ message, userId, roomId, imageId })
  }

  triggerBroadcast({ message, userId, nickname, roomId, imageId }) {
    io.to(roomId).emit('message', { message, userId, nickname, imageId });
    // io.emit('message', { message, roomId, userId, nickname });
  }
}