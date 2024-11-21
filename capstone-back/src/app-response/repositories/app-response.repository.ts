import { Injectable } from "@nestjs/common";
import { CreateAppResponseDto } from "../dto/create-app-response.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AppResponseRepository {
    constructor(private readonly prisma: PrismaService) {}

  async createResponse(data: CreateAppResponseDto) {
    return this.prisma.appResponse.create({
      data,
    });
  }

  async getResponsesByApplicationId(applicationId: number) {
    return this.prisma.appResponse.findMany({
      where: { applicationId },
    });
  }

  async getResponsesByUserId(userId: number) {
    return this.prisma.appResponse.findMany({
      where: { userId },
    });
  }
}