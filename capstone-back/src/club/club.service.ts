import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubRepository } from './repositories/club.repository';
import { Club } from '@prisma/client';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) { }

  async createClub(createClubDto: CreateClubDto, userId: number): Promise<Club> {
    return this.clubRepository.createClub(createClubDto, userId);
  }

  async getAllClub(): Promise<Club[]> {
    return this.clubRepository.getAllClub();
  }

  async getClubById(clubId: number): Promise<Club> {
    return this.clubRepository.getClubById(clubId);
  }

  async getAllCalendars(clubId: number) {
    return this.clubRepository.getAllCalendars(clubId);
  }

  async getAllReceipts(clubId: number) {
    return this.clubRepository.getAllReceipts(clubId);
  }

  async getClubsByJoinedUserId(userId: number) {
    return this.clubRepository.getClubsByUserId(userId);
  }
}
