import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { UpdateClubDto } from '../dto/update-club.dto';
import { Club } from '@prisma/client';

@Injectable()
export class ClubRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createClub(data: CreateClubDto): Promise<Club> {
        return this.prisma.club.create({
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
            },
        });
    }

    async getAllClub(): Promise<Club[]> {
        return this.prisma.club.findMany();
    }

    async getClubById(clubId: number): Promise<Club | null> {
        return this.prisma.club.findUnique({
            where: { clubId },
        });
    }

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
}
