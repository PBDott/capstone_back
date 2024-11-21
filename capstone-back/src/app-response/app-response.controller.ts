import { Body, Controller, Get, InternalServerErrorException, NotFoundException, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CreateAppResponseDto } from "./dto/create-app-response.dto";
import { AppResponseService } from "./app-response.service";

@Controller('app-response')
export class AppResponseController {
    constructor(private readonly applicationResponseService: AppResponseService) {}

    @Post('')
    async createResponse(@Body() createDto: CreateAppResponseDto) {
      try {
        return await this.applicationResponseService.createResponse(createDto);
      } catch (error) {
        throw new InternalServerErrorException('Failed to create application response');
      }
    }

    @Get('byApplication')
    async getResponsesByApplicationId(@Query('applicationId', ParseIntPipe) applicationId: number) {
      try {
        const responses = await this.applicationResponseService.getResponsesByApplicationId(applicationId);
        if (!responses || responses.length === 0) {
          throw new NotFoundException(`No responses found for application ID ${applicationId}`);
        }
        return responses;
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch responses by application ID');
      }
    }

    @Get('byUser')
    async getResponsesByUserId(@Query('userId', ParseIntPipe) userId: number) {
      try {
        const responses = await this.applicationResponseService.getResponsesByUserId(userId);
        if (!responses || responses.length === 0) {
          throw new NotFoundException(`No responses found for user ID ${userId}`);
        }
        return responses;
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch responses by user ID');
      }
    }
}