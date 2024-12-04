import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getUserInfo(userId: number) {
    const userInfo = await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        image: true,
      }
    });
    if (!userInfo) {
      throw new NotFoundException();
    }
    console.log(userInfo)
    return userInfo;
  }
}
