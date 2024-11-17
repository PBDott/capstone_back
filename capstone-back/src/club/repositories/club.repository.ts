import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { UpdateClubDto } from '../dto/update-club.dto';
import { Club } from '@prisma/client';

@Injectable()
export class ClubRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createClub(data: CreateClubDto, userId:number): Promise<Club> {
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

    async getClubById(clubId: number): Promise<Club | null> {
        return this.prisma.club.findFirst({
            where: { clubId, status: 'ACCEPTED' },
        });
    }

    async updateClub(clubId: number, data: UpdateClubDto): Promise<Club | null> {
        
        const club = await this.getClubById(clubId);
        if(!club) {
            throw new NotFoundException(`Club with ID ${clubId} is not accepted or does not exist.`);
        }
        
        return this.prisma.club.update({
            where: { clubId },
            data,
        });
    }

    async deleteClub(clubId: number): Promise<Club | null> {

        const club = await this.getClubById(clubId);
        if (!club) {
            throw new NotFoundException(`Club with ID ${clubId} is not accepted or does not exist.`);
        }

        return this.prisma.club.delete({
            where: { clubId },
        });
    }
}
