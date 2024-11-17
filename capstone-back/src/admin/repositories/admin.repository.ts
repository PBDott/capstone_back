import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Club, ClubStatus, Roles, User } from "@prisma/client";
import { UpdateClubStatusDto } from "../dto/update-club-status.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

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
        const { clubId, status } = updateClubStatusDto;

        const club = await this.prisma.club.update({
            where: { clubId },
            data: { status }
        });

        if(status === ClubStatus.ACCEPTED) {
            const adminList: number[] = Array.isArray(club.adminList) ? club.adminList as number[] : [];
            await this.prisma.user.updateMany({
                where: { userId: { in: adminList } },
                data: { role: Roles.CLUBADMIN }
            });
        }
        
        return club;

    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: { ...createUserDto }
        });
    }
    
    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { userId },
            data: updateUserDto
        });
    }

    async deleteUser(userId: number): Promise<User> {
        return this.prisma.user.delete({
            where: { userId }
        });
    }
}