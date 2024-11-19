import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreasteApplicationDto } from "../dto/create-application.dto";
import { UpdateApplicationDto } from "../dto/update-application";
import { Application } from "@prisma/client";

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async creasteApplication(data: CreasteApplicationDto): Promise<Application> {
        return this.prisma.application.create({
            data,
        });
    }

    async getApplicationByClubId(clubId: number): Promise<Application[]> {
        return this.prisma.application.findMany({
            where: { clubId }
        });
    }

    async getApplicationById(applicationId: number): Promise<Application> {
        return this.prisma.application.findUnique({
            where: { applicationId: applicationId }
        });
    }

    async updateApplication(applicationId: number, data: UpdateApplicationDto): Promise<Application> {
        return this.prisma.application.update({
            where: { applicationId },
            data: data
        });
    }

    async deleteApplication(applicationId: number): Promise<Application> {
        return this.prisma.application.delete({
            where: { applicationId }
        });
    }
}