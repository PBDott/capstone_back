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
        school: data.school,
        location: data.location,
        description: data.description,
        imageId: data.imageId,
        adminList: [userId]
      },
    });
  }

  async getAllClub(): Promise<Club[]> {
    const clubs = await this.prisma.club.findMany({
      where: { status: 'ACCEPTED' },
      include: {
        applications: true,  // 동아리에 속한 Application 정보를 포함
      },
    });
  
    // 각 동아리에 대해 application이 있는지 확인
    return clubs.map(club => ({
      ...club,
      application: club.applications.length > 0,  // application이 존재하면 true, 아니면 false
    }));
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

  async getClubsByUserId(userId: number) {
    return this.prisma.clubParticipants.findMany({
      where: {
        userId,
      },
      include: {
        club: true
      },
    });
  }
}
