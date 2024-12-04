import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubRepository } from './repositories/club.repository';
import { Club } from '@prisma/client';
import { ImageHandlerService } from 'src/imageHandler/imageHandler.service';

@Injectable()
export class ClubService {
  constructor(
    private readonly clubRepository: ClubRepository,
    private readonly imageHandlerService: ImageHandlerService,
  ) { }

  async createClub(createClubDto: CreateClubDto, userId: number): Promise<Club> {
    const club = await this.clubRepository.createClub(createClubDto, userId);
    await this.imageHandlerService.attachImageToClub({ imageId: createClubDto.imageId, clubId: club.clubId });
    return club;
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
