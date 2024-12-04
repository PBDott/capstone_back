import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, Query, NotFoundException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClubRoles } from '../clubRoles.decorator';
import { ApplicationService } from './application.service';
import { CreasteApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application';
import { DeleteApplicationDto } from './dto/delete-application.dto';
import { Application } from '@prisma/client';
import { UpdateAppResponseStatusDto } from './dto/update-appresponse-status.dto';
import { getAppResponseByApplicationDto } from './dto/get-appreponse.dto';
import { query } from 'express';


@Controller('club-admin/application')
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
    async getApplicationByClubId(@Query('clubId', ParseIntPipe) clubId: number): Promise<Application> {
        const application = await this.applicationService.getApplicationByClubId(clubId);
        if (!application) {
            throw new NotFoundException(`No application found for club ID ${clubId}`);
        }
        return application;
    }

    @Get('byApplication')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getAppResponseByApplicationId(@Query('applicationId', ParseIntPipe) applicationId: number) {
        try {
            const response = await this.applicationService.getAppResponseByApplicationId(applicationId);
            if (!response) {
                throw new NotFoundException(`No responses found for application ID ${applicationId}`);
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Failed to getAppResponse by ApplicationId');
        }
    }

    @Get(':applicationId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getApplicationById(@Param('applicationId', ParseIntPipe) applicationId: number): Promise<Application> {
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
            const application = await this.applicationService.updateApplication(applicationId, updateDto);
            if (!application) {
                throw new NotFoundException(`Application with ID ${applicationId} not found`);
            }
            return application;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to update application');
        }
    }

    // 필요 없음
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

    @Post('updateStatus')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async updateAppResponseStatus(@Body() updateStatusDto: UpdateAppResponseStatusDto) {
        const { applicationId, userId, status } = updateStatusDto;
        try {
            const updatedResponse = await this.applicationService.updateAppResponseStatus(applicationId, userId, status);

            if (!updatedResponse) {
                throw new NotFoundException(`Response not found for application ID ${applicationId} and user ID ${userId}`);
            }
            return updatedResponse;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to update Appresponse status');
        }
    }

    @Post('checkApplication')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async checkApplication(@Body() body: { clubId: number }) {
        try {
            const checkApplication = await this.applicationService.checkApplication(body.clubId);
            return checkApplication;  
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to check Application');
        }
    }
    

}
