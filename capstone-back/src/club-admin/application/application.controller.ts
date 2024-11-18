import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, Query, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClubRoles } from '../clubRoles.decorator';
import { ApplicationService } from './application.service';
import { CreasteApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application';
import { DeleteApplicationDto } from './dto/delete-application.dto';
import { Application } from '@prisma/client';


@Controller('club-admin')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async createApplication(@Body() createDto: CreasteApplicationDto): Promise<Application> {
        return this.applicationService.createApplication(createDto);
    }

    @Get('')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getApplicationByClubId(@Query('clubId') clubId: number): Promise<Application[]> {
        try {
            const application = await this.applicationService.getApplicationByClubId(clubId);
            if (!application) {
                throw new NotFoundException(`No application found for club ID ${clubId}`);
            }
            return application;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get application forms');
        }
    }

    @Get(':applicationId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getApplicationById(@Body('applicationId') applicationId: number): Promise<Application> {
        try {
            const application = await this.applicationService.getApplicationById(applicationId);
            if (!application) {
                throw new NotFoundException(`Application with ID ${applicationId} not found`);
            }
            return application;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get application');
        }
    }



    @Post('update')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async updateApplication(@Body() updateDto: UpdateApplicationDto): Promise<Application> {
        const applicationId = updateDto.applicationId;
        try {
            const application = await this.applicationService.getApplicationById(applicationId);
            if (!application) {
                throw new NotFoundException(`Application with ID ${applicationId} not found`);
            }
            return application;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update application');
        }
    }

    // 신청서 폼 삭제
    @Post('delete')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async delete(@Body() deleteDto: DeleteApplicationDto): Promise<Application> {
        const applicationId = deleteDto.applicationId;
        try {
            const application = await this.applicationService.getApplicationById(applicationId);
            if (!application) {
                throw new NotFoundException(`Application with ID ${applicationId} not found`);
            }
            return await this.applicationService.deleteApplication(applicationId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete application');
        }
    }


}
