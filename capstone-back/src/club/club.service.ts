import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubRepository } from './repositories/club.repository';
import { Club } from '@prisma/client';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) { }
  
  async createClub(createClubDto: CreateClubDto): Promise<Club> {
    return this.clubRepository.createClub(createClubDto);
  }

  async getAllClub(): Promise<Club[]> {
    return this.clubRepository.getAllClub();
  }

  async getClubById(clubId: number): Promise<Club> {
    return this.clubRepository.getClubById(clubId);
  }

  async updateClub(clubId: number, updateClubDto: UpdateClubDto) {
    return this.clubRepository.updateClub(clubId, updateClubDto);
  }

  async deleteClub(clubId: number): Promise<Club> {
    return this.clubRepository.deleteClub(clubId);
  }
}
