import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getRoomById(roomId: string) {
    return this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
  }

  async createRoom({ type, id }: { id: number, type: string }): Promise<Room> {
    return this.prisma.room.create({
      data: {
        id: `${type}:${id}`,
        type,
      }
    });
  }

  async deleteRoom(roomId: string): Promise<Room> {
    return this.prisma.room.delete({
      where: {
        id: roomId
      },
    });
  }

  async joinRoom(roomId: string): Promise<Room> {
    return this.prisma.room.findUnique({
      where: {
        id: roomId
      },
    });
  }
}
