import { Injectable, NotFoundException } from "@nestjs/common";
import { Club } from "@prisma/client";
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

        return this.prisma.$transaction([
            this.prisma.club.update({
                where: { clubId },
                data: { adminList },
            }),
            this.prisma.user.update({
                where: { userId },
                data: { role: 'CLUBADMIN' },
            }),
        ]);
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

}      