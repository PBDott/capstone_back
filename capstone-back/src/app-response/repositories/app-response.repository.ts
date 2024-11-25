import { Injectable } from "@nestjs/common";
import { CreateAppResponseDto } from "../dto/create-app-response.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AppResponseRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createResponse(data: CreateAppResponseDto) {
    const existingResponse = await this.prisma.appResponse.findFirst({
      where: {
        userId: data.userId,
        applicationId: data.applicationId,
      },
    });

    if (existingResponse) {
      throw new Error('Response already exists for this application and user.');
    }

    return this.prisma.appResponse.create({
      data: {
        applicationId: data.applicationId,
        userId: data.userId,
        answers: data.answers, 
        status: 'PENDING',
      },
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