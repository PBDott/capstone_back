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

  async createChat({ message, userId, roomId, }: { userId: number, roomId: string, message: string }) {
    return this.chatRepository.saveChat({ message, userId, roomId, })
  }

  triggerBroadcast({ message, userId, nickName, roomId }) {
    console.log(`broadcast to ${roomId}`);
    io.to(roomId).emit('message', { message, userId, nickName });
    // io.emit('message', { message, roomId, userId, nickName });
  }
}