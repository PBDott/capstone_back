import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
    })).map(({ content, createdAt, id, roomId, user, userId, imageId }) => ({
      message: content, createdAt, id, roomId, nickname: user.nickname, userId, imageId
    }));
  }

  async saveChat({ userId, message, roomId, imageId }: { userId: number, message: string | null, roomId: string, imageId: number | null }) {
    return this.prisma.chat.create({
      data: {
        roomId,
        userId,
        content: message,
        imageId,
      }
    })
  }
}
