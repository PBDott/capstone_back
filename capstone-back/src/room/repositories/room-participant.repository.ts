import { Injectable } from '@nestjs/common';
import { RoomParticipant } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomParticipantRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getParticipants(roomId: string) {
    return this.prisma.roomParticipant.findMany({
      where: {
        roomId,
      },
      include: {
        user: {
          select: {
            nickname: true,
          }
        }
      }
    });
  }

  async addUser({ userId, roomId }: { userId: number, roomId: string }): Promise<RoomParticipant> {
    return this.prisma.roomParticipant.create({
      data: {
        userId,
        roomId,
      }
    });
  }

  async removeUser({ userId, roomId }: { userId: number, roomId: string }) {
    return this.prisma.roomParticipant.delete({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });
  }
}
