import { Injectable } from "@nestjs/common";
import { ApplicationRepository } from "./repositories/application.repository";
import { CreasteApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application";
import { Application } from "@prisma/client";

@Injectable()
export class ApplicationService {
    constructor(private readonly applicationRepository: ApplicationRepository) {}

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
}