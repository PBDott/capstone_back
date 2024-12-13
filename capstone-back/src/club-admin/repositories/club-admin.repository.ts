import { Injectable, NotFoundException } from "@nestjs/common";
import { Club, PlanStatus } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateClubDto } from "../dto/update-club.dto";

@Injectable()
export class ClubAdminRepository {
    constructor(private readonly prisma: PrismaService) { }

    async updateClub(clubId: number, data: UpdateClubDto): Promise<Club> {
        return this.prisma.club.update({
            where: { clubId },
            data,
        });
    }

    async deleteClub(clubId: number): Promise<Club> {
        return this.prisma.club.delete({
            where: { clubId },
        });
    }

    async updateClubAdmin(clubId: number, userId: number) {
        const club = await this.prisma.club.findUnique({
            where: { clubId },
        });

        const adminList: number[] = club.adminList as number[];
        if (!adminList.includes(userId)) {
            adminList.push(userId);
        }
        const userList: number[] = club.userList as number[];
        const updatedUserList = userList.filter(id => id !== userId);

        await this.prisma.$transaction([
            this.prisma.club.update({
                where: { clubId },
                data: { 
                    userList: updatedUserList,
                    adminList 
                },
            }),
            this.prisma.user.update({
                where: { userId },
                data: { role: 'CLUBADMIN' },
            }),
        ]);

        return await this.getAllMember(clubId);
    }

    async getClubData(userId: number) {
        return this.prisma.club.findFirst({
            where: {
                adminList: {
                    //path: 'data',  
                    array_contains: [userId],
                },
            },
        });
    }

    async getAllMember(clubId: number) {
        const club = await this.prisma.club.findUnique({
            where: { clubId },
            select: {
                userList: true, 
                adminList: true, 
            },
        });

        const userList: number[] = club.userList as number[];
        const adminList: number[] = club.adminList as number[];

        const userId = [...userList, ...adminList];
        const uniqueUserId = [...new Set(userId)];
        

        return await this.prisma.user.findMany({
            where: {
                userId: {
                    in: uniqueUserId,
                },
            },
        });
    }

    async deleteUser(clubId: number, userId: number) {
        const club = await this.prisma.club.findUnique({
            where: { clubId },
        });
    
        let userList: number[] = club.userList as number[];
        userList = userList.filter(id => id !== userId);
    
        await this.prisma.club.update({
            where: { clubId },
            data: { userList },
        });
    
        return this.getAllMember(clubId);
    }

    async changePlan(clubId: number, planStatus: PlanStatus) {
        return await this.prisma.club.update({
            where: {clubId},
            data: {plan: planStatus}
        });
    }
}      
