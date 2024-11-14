import { Injectable } from '@nestjs/common';
import { room } from '../entities/room.entity';
import { Message } from '../entities/message.entity';

@Injectable()
export class ChatRepository {
  private rooms: room[] = [];
  private messages: Message[] = [];

  createRoom(roomName: string): room {
    const room = { id: Date.now().toString(), name: roomName, users: [] };
    this.rooms.push(room);
    return room;
  }

  findRoomById(roomId: string): room | undefined {
    return this.rooms.find((room) => room.id === roomId);
  }

  saveMessage(message: Message): Message {
    this.messages.push(message);
    return message;
  }

  findMessagesByRoomId(roomId: string): Message[] {
    return this.messages.filter((msg) => msg.roomId === roomId);
  }
}