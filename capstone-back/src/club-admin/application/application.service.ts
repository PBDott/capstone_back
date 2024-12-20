import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ApplicationRepository } from "./repositories/application.repository";
import { CreasteApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application";
import { Application, ApplicationStatus } from "@prisma/client";

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) { }

  async createApplication(createDto: CreasteApplicationDto): Promise<Application> {
    return this.applicationRepository.createApplication(createDto);
  }

  async getApplicationByClubId(clubId: number): Promise<Application> {
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
    if (status === 'ACCEPTED') {
        const isLimitHit = await this.applicationRepository.checkFreePlanLimit(applicationId);

        if (isLimitHit) {
            throw new HttpException(
                { errorCode: 'FREE_PLAN_LIMIT', message: 'Free plan user limit hit' },
                HttpStatus.FORBIDDEN,
            );
        }
    }

    const updatedResponse = await this.applicationRepository.updateAppResponseStatus(applicationId, userId, status);

    if (status === 'ACCEPTED') {
        const response = await this.applicationRepository.addMemberToClub(applicationId, userId);
    }

    return updatedResponse;
}


  async checkApplication(clubId: number) {
    return this.applicationRepository.checkApplication(clubId);
  }
}