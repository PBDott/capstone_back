import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClubAdminRepository } from './repositories/club-admin.repository';
import { ClubRepository } from 'src/club/repositories/club.repository';
import { Club, PlanStatus } from '@prisma/client';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubAdminService {
  constructor(
    private readonly clubAdminRepository: ClubAdminRepository,
    private readonly clubRepository: ClubRepository
  ) { }

  async updateClub(clubId: number, updateClubDto: UpdateClubDto) {
    return this.clubAdminRepository.updateClub(clubId, updateClubDto);
  }

  async deleteClub(clubId: number): Promise<Club> {
    return this.clubAdminRepository.deleteClub(clubId);
  }

  async updateClubAdmin(clubId: number, userId: number) {
    const club = await this.clubRepository.getClubById(clubId);
    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found.`);
    }

    const userList: number[] = club.userList as number[];
    if (!userList.includes(userId)) {
      throw new NotFoundException(`User with ID ${userId} is not a member of this club.`);
    }

    try {
      return await this.clubAdminRepository.updateClubAdmin(clubId, userId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update club admin');
    }
  }
  
  async getAllMember(clubId: number) {
      return await this.clubAdminRepository.getAllMember(clubId);
  }

  async getClubData(userId: number) {
    return await this.clubAdminRepository.getClubData(userId);
  }

  async deleteUser(clubId: number, userId: number) {
    return this.clubAdminRepository.deleteUser(clubId, userId);
  }

  async changePlan(clubId: number, planStatus: PlanStatus) {
    return this.clubAdminRepository.changePlan(clubId, planStatus);
  }
}
