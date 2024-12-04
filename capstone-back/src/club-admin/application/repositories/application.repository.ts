import { HttpException, HttpStatus, Injectable, NotAcceptableException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreasteApplicationDto } from "../dto/create-application.dto";
import { UpdateApplicationDto } from "../dto/update-application";
import { Application, ApplicationStatus, PlanStatus } from "@prisma/client";

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createApplication(data: CreasteApplicationDto): Promise<Application> {
        return this.prisma.application.create({
            data,
        });
    }

    async getApplicationByClubId(clubId: number): Promise<Application | null> {
        const applications = await this.prisma.application.findMany({
            where: { clubId },
        });

        return applications.length > 0 ? applications[0] : null;
    }

    async getApplicationById(applicationId: number): Promise<Application> {
        return this.prisma.application.findUnique({
            where: { applicationId: applicationId }
        });
    }

    async updateApplication(applicationId: number, data: UpdateApplicationDto): Promise<Application> {
        const { applicationId: _, ...updateData } = data;
        return this.prisma.application.update({
            where: { applicationId },
            data: updateData
        });
    }

    async deleteApplication(applicationId: number): Promise<Application> {
        return this.prisma.application.delete({
            where: { applicationId }
        });
    }

    async getAppResponseByApplicationId(applicationId: number) {
        return this.prisma.appResponse.findMany({
            where: { applicationId },
            include: {
                user: true,
            },
        });
    }

    async updateAppResponseStatus(applicationId: number, userId: number, status: ApplicationStatus) {
        return this.prisma.appResponse.updateMany({
            where: {
                applicationId,
                userId,
            },
            data: { status }
        });
    }
    async addMemberToClub(applicationId: number, userId: number) {
        const application = await this.prisma.application.findUnique({
            where: { applicationId },
            select: { clubId: true },
        });
    
        if (!application) {
            throw new Error(`Club not found for application ID ${applicationId}`);
        }
    
        const clubId = application.clubId;
    
        const club = await this.prisma.club.findUnique({
            where: { clubId },
            select: { userList: true },
        });
    
        if (!club) {
            throw new Error(`Club with ID ${clubId} not found`);
        }
    
        const userList: number[] = club.userList as number[];
    
        if (userList.includes(userId)) {
            throw new HttpException(
                { message: 'User already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }
    
        userList.push(userId);
    
        const updateClub = await this.prisma.club.update({
            where: { clubId },
            data: { userList },
            select: { userList: true },
        });
    
        return updateClub.userList;
    }

    async checkFreePlanLimit(applicationId: number): Promise<boolean> {
        const application = await this.prisma.application.findUnique({
            where: { applicationId },
            select: { clubId: true },
        });
    
        if (!application) {
            throw new Error(`Club not found for application ID ${applicationId}`);
        }
    
        const club = await this.prisma.club.findUnique({
            where: { clubId: application.clubId },
            select: { userList: true, plan: true },
        });
    
        if (!club) {
            throw new Error(`Club with ID ${application.clubId} not found`);
        }
    
        // Check if the plan is free and limit is exceeded
        return club.plan === PlanStatus.FREE && club.userList.length >= 5;
    }
    
    
    async checkApplication(clubId: number): Promise<boolean> {
        const application = await this.prisma.application.findFirst({
            where: { clubId },
        });

        // clubId가 존재하면 true, 아니면 false 반환
        return application ? true : false;
    }
}