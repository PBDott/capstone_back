import { Injectable } from '@nestjs/common';
import { ChatRepository } from './repositories/chat.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/Message.entity';

@Injectable()
export class ChatService { 
  constructor(private readonly chatRepository: ChatRepository) {}

  createRoom(roomName: string) {
    return this.chatRepository.createRoom(roomName);
  }

  joinRoom(roomId: string, userId: string) {
    const room = this.chatRepository.findRoomById(roomId);
    if (room) room.users.push(userId);
    return room;
  }

  leaveRoom(roomId: string, userId: string) {
    const room = this.chatRepository.findRoomById(roomId);
    if (room) room.users = room.users.filter((user) => user !== userId);
    return room;
  }

  sendMessage(createMessageDto: CreateMessageDto): Message {
    const { room, sender, message } = createMessageDto;
    const newMessage = { messageId: Date.now().toString(), roomId: room, sender, content: message, timestamp: new Date() };
    return this.chatRepository.saveMessage(newMessage);
  }

  getMessagesByRoom(roomId: string): Message[] {
    return this.chatRepository.findMessagesByRoomId(roomId);
  }
}
