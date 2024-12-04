import { Injectable } from "@nestjs/common";
import { ApplicationRepository } from "./repositories/application.repository";
import { CreasteApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application";
import { Application, ApplicationStatus } from "@prisma/client";

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) { }

  async createApplication(createDto: CreasteApplicationDto): Promise<Application> {
    return this.applicationRepository.creasteApplication(createDto);
  }

  async getApplicationByClubId(clubId: number): Promise<Application[]> {
    return this.applicationRepository.getApplicationByClubId(clubId);
  }

  async getApplicationById(formId: number): Promise<Application> {
    return this.applicationRepository.getApplicationById(formId);
  }

  async updateApplication(applicationId: number, updateDto: UpdateApplicationDto): Promise<Application> {
    return this.applicationRepository.updateApplication(applicationId, updateDto);
  }

  async deleteApplication(applicationId: number): Promise<Application> {
    return this.applicationRepository.deleteApplication(applicationId);
  } 

  async getAppResponseByApplicationId(applicationId: number) {
    return this.applicationRepository.getAppResponseByApplicationId(applicationId);
  }

  async updateAppResponseStatus(applicationId: number, userId: number, status: ApplicationStatus) {
    const updatedResponse = await this.applicationRepository.updateAppResponseStatus(applicationId, userId, status);

    if (status === 'ACCEPTED') {
      await this.applicationRepository.addMemberToClub(applicationId, userId);
    }

    return updatedResponse;
  }

  async checkApplication(applicationId: number) {
    return this.applicationRepository.checkApplication(applicationId);
  }
}