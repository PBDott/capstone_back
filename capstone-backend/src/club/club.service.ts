import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { ClubRepository } from './repositores/club.repository';
import { NotFoundError } from 'rxjs';
import { DeleteClubDto } from './dto/delete-club.dto';

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}
  // 클럽생성
  async createClub(createClubDto: CreateClubDto): Promise<Club> {
    return this.clubRepository.createClub(createClubDto);
  }

  async getAllClub(): Promise<Club[]> {
    return this.clubRepository.getAllClub();
  }

  async getClubById(id: number): Promise<Club> {
    return this.clubRepository.getClubById(id);
  }

  async updateClub(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    return this.clubRepository.updateClub(id, updateClubDto);
  }

  async deleteClub(id: number): Promise<Club> {
    return this.clubRepository.deleteClub(id);
  }
}
