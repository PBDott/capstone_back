import { Injectable } from "@nestjs/common";
import { AppResponseRepository } from "./repositories/app-response.repository";
import { CreateAppResponseDto } from "./dto/create-app-response.dto";
import { Application } from "@prisma/client";

@Injectable()
export class AppResponseService {
  constructor(private readonly applicationResponseRepository: AppResponseRepository) { }

  async createResponse(createDto: CreateAppResponseDto) {
    return this.applicationResponseRepository.createResponse(createDto);
  }

  async getResponsesByUserId(userId: number) {
    return this.applicationResponseRepository.getResponsesByUserId(userId);
  }

  async getApplicationByClubId(clubId: number): Promise<Application> {
    return this.applicationResponseRepository.getApplicationByClubId(clubId);
  }

  async availableClub(userId: number) {
    return this.applicationResponseRepository.availableClub(userId);
  }
}