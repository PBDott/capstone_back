import { Body, Controller, Get, InternalServerErrorException, NotFoundException, ParseIntPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateAppResponseDto } from "./dto/create-app-response.dto";
import { AppResponseService } from "./app-response.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Application } from "@prisma/client";

@Controller('app-response')
export class AppResponseController {
  constructor(private readonly applicationResponseService: AppResponseService) { }

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createResponse(@Body() createDto: CreateAppResponseDto, @Req() req) {
    try {
      const { userId } = req.payload;

      const appData = { ...createDto, userId };
      return await this.applicationResponseService.createResponse(appData);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create application response');
    }
  }

  @Get('byUser')
  async getResponsesByUserId(@Query('userId', ParseIntPipe) userId: number) {
    try {
      const responses = await this.applicationResponseService.getResponsesByUserId(userId);
      if (!responses) {
        throw new NotFoundException(`No responses found for user ID ${userId}`);
      }
      return responses;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch responses by user ID');
    }
  }

  @Get('')
  async getApplicationByClubId(@Query('clubId', ParseIntPipe) clubId: number): Promise<Application> {
      const application = await this.applicationResponseService.getApplicationByClubId(clubId);
      if (!application) {
          throw new NotFoundException(`No application found for club ID ${clubId}`);
      }
      return application;
  }

}