import { io } from "src/main";
import { RoomRepository } from "./repositories/room.repository";
import { ClubService } from "src/club/club.service";
import { TradeService } from "src/trade/trade.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { RoomParticipantRepository } from "./repositories/room-participant.repository";
import { ChatService } from "src/chat/chat.service";

@Injectable()
export class RoomService {
  constructor(
    private readonly chatService: ChatService,
    private readonly clubService: ClubService,
    private readonly tradeService: TradeService,
    private readonly roomRepository: RoomRepository,
    private readonly roomParticipantRepository: RoomParticipantRepository,
  ) { }

  async connect({ id, type, nickname, userId, socketId }: { type: string, id: number, socketId: string, nickname: string, userId: number }) {
    if (type === 'club') {
      // [TODO] get club's participants and check the requester is in the club
    }
    if (type === 'trade') {
      const trade = await this.tradeService.getTradeById(id);
      if (trade.buyerId !== userId && trade.sellerId !== userId) {
        throw new ForbiddenException(`user ${userId} not in trade ${id}`);
      }
    }
    const roomId = `${type}:${id}`;
    const room = await this.getRoomInfoById(roomId);
    if (!room) {
      await this.createRoom({ type, id });
    }
    const roomParticipants = await this.getParticipantsByRoomId(roomId);
    if (roomParticipants.filter((e) => e.userId === userId).length === 0) {
      const addParticipantResult = await this.addUserToParticipant({ roomId, userId });
      roomParticipants.push({ ...addParticipantResult, nickname: nickname });
    }

    console.log(`try to connect: ${socketId} to ${roomId}`);
    const socket = io.sockets.sockets.get(socketId);
    socket.join(roomId);
    socket.to(roomId).emit('join', { nickname, userId });

    const recentChats = await this.chatService.getChats({ roomId, offset: 0, limit: 50 });
    return { participants: roomParticipants, chats: recentChats };
  }

  leaveRoom({ roomId, userId, socketId, nickname }: { roomId: string, userId: number, socketId: string, nickname: string }) {
    // [TODO] if socket.to.emit not works, replace to socketsLeave
    // io.in(socketId).socketsLeave(roomId)
    // io.to(roomId).emit('leave', userId);
    const socket = io.sockets.sockets.get(socketId);
    socket.to(roomId).emit('leave', { userId, nickname });
  }

  async createRoom({ type, id }: { type: string, id: number }) {
    return await this.roomRepository.createRoom({ type, id });
  }

  async getParticipantsByRoomId(roomId: string) {
    return (await this.roomParticipantRepository.getParticipants(roomId)).map((participant) => {
      const nickname = participant.user.nickname;
      const { userId,
        roomId,
        role,
        joinedAt } = participant;
      return {
        nickname, userId, roomId, role, joinedAt
      };
    });
  }

  async getRoomInfoById(roomId: string) {
    return this.roomRepository.getRoomById(roomId);
  }

  async addUserToParticipant({ roomId, userId }: { roomId: string, userId: number }) {
    return this.roomParticipantRepository.addUser({ roomId, userId });
  }
}
