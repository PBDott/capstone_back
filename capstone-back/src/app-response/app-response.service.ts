import { Injectable } from "@nestjs/common";
import { AppResponseRepository } from "./repositories/app-response.repository";
import { CreateAppResponseDto } from "./dto/create-app-response.dto";

@Injectable()
export class AppResponseService {
    constructor(private readonly applicationResponseRepository: AppResponseRepository) {}

    async createResponse(createDto: CreateAppResponseDto) {
      return this.applicationResponseRepository.createResponse(createDto);
    }
  
    async getResponsesByApplicationId(applicationId: number) {
      return this.applicationResponseRepository.getResponsesByApplicationId(applicationId);
    }
  
    async getResponsesByUserId(userId: number) {
      return this.applicationResponseRepository.getResponsesByUserId(userId);
    }
}