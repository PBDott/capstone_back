import { Injectable } from "@nestjs/common";
import { CreateAppResponseDto } from "../dto/create-app-response.dto";
import { PrismaService } from "src/prisma.service";
import { Application } from "@prisma/client";

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

  async getResponsesByUserId(userId: number) {
    return this.prisma.appResponse.findMany({
      where: { userId },
    });
  }

  async getApplicationByClubId(clubId: number): Promise<Application | null> {
    const applications = await this.prisma.application.findMany({
      where: { clubId },
    });

    return applications.length > 0 ? applications[0] : null;
  }

  async availableClub(userId: number) {
    const userApplications = await this.prisma.appResponse.findMany({
      where: {
        userId,
      },
      include: {
        application: {
          select: {
            clubId: true,  
          },
        },
      },
    });

    const appliedClubIds = userApplications.map(response => response.application.clubId);

    return this.prisma.club.findMany({
      where: {
        NOT: {
          clubId: { in: appliedClubIds },  
        },
      },
    });
  }

}