import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { UpdateClubDto } from '../dto/update-club.dto';
import { Club } from '@prisma/client';

@Injectable()
export class ClubRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createClub(data: CreateClubDto, userId: number): Promise<Club> {
        return this.prisma.club.create({
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                imageUrl: data.imageUrl,
                adminList: [userId]
            },
        });
    }

    async getAllClub(): Promise<Club[]> {
        return this.prisma.club.findMany({
            where: { status: 'ACCEPTED' }
        });
    }

    async getClubById(clubId: number): Promise<Club> {
        return this.prisma.club.findFirst({
            where: {
                clubId: clubId, 
                status: "ACCEPTED", 
            },
        });
    }


    async getAllCalendars(clubId: number) {
        return this.prisma.calendar.findMany({ where: { clubId } });
    }

    async getAllReceipts(clubId: number) {
        return this.prisma.receipt.findMany({ where: { clubId } });
    }

}
