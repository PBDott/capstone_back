import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreasteApplicationDto } from "../dto/create-application.dto";
import { UpdateApplicationDto } from "../dto/update-application";
import { Application, ApplicationStatus } from "@prisma/client";

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
            where: { applicationId }
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
            select: { userList: true }
        });


        if (!club) {
            throw new Error(`Club with ID ${clubId} not found`);
        }

        //const userList: number[] = club.userList as number[]
        const userList: number[] = club.userList as number[]; 

        if (userList.includes(userId)) {
            throw new Error(`User with ID ${userId} is already a member of the club`);
        }

        userList.push(userId);

        const updateClub = await this.prisma.club.update({
            where: { clubId },
            data: { userList },
            select: { userList: true },
        });
        
        return updateClub.userList;
    }

    async checkApplication(clubId: number) {
        const applications = await this.prisma.application.findMany({
            where: { clubId },
        });

        if(applications) {
            return true;
        } else {
            return false;
        }
    }
}