import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Club, User } from "@prisma/client";
import { UpdateClubStatusDto } from "../dto/update-club-status.dto";

@Injectable()
export class AdminRepository {
    constructor(private readonly prisma: PrismaService) {}

    async changeAdmin(userId: number): Promise<User> {
        return this.prisma.user.update({
            where: { userId: userId },
            data: { role: 'ADMIN' }
        });
    }

    async getPendingClubs(): Promise<Club[]> {
        return this.prisma.club.findMany({
            where: {
                status: 'PENDING'
            }
        });
    }

    async updateClubStatus(updateClubStatusDto: UpdateClubStatusDto): Promise<Club> {
        return this.prisma.club.update({
            where: { clubId: updateClubStatusDto.clubId },
            data: { status: updateClubStatusDto.status }
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}