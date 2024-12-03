import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { Message } from '../entities/message.entity';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getChatsByRoomId({ roomId, offset, limit }: { roomId: string, offset: number, limit: number }) {
    return (await this.prisma.chat.findMany({
      where: { roomId },
      skip: offset,
      take: limit,
      include: {
        user: {
          select: {
            nickname: true,
          },
        },
      },
    })).map(({ content, createdAt, id, roomId, user, userId }) => ({
      content, createdAt, id, roomId, nickname: user.nickname, userId
    }));
  }

  async saveChat({ userId, message, roomId }: { userId: number, message: string, roomId: string }) {
    return this.prisma.chat.create({
      data: {
        roomId,
        userId,
        content: message
      }
    })
  }
}
