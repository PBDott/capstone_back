import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { Club } from '@prisma/client';
import { UpdateClubDto } from '../dto/update-club.dto';

@Injectable()
export class ClubRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClub(clubData: CreateClubDto): Promise<Club> {
    return this.prisma.club.create({
      data: {
        name: clubData.name,
        school: clubData.school,
        location: clubData.location,
        description: clubData.description,
        adminList: clubData.adminList,
      },
    });
  }

  async getAllClub(): Promise<Club[]> {
    return this.prisma.club.findMany();
  }

  async getClubById(id: number): Promise<Club> {
    return this.prisma.club.findUnique({
      where: {
        id,
      },
    });
  }

  async updateClub(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    return this.prisma.club.update({
      where: { id },
      data: updateClubDto,
    });
  }

  async deleteClub(id: number): Promise<Club> {
    return this.prisma.club.delete({
      where: { id },
    });
  }
}
