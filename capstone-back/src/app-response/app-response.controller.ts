import { Body, Controller, Get, InternalServerErrorException, NotFoundException, ParseIntPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateAppResponseDto } from "./dto/create-app-response.dto";
import { AppResponseService } from "./app-response.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

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

  @Get('byApplication')
  async getResponsesByApplicationId(@Query('applicationId', ParseIntPipe) applicationId: number) {
    try {
      const responses = await this.applicationResponseService.getResponsesByApplicationId(applicationId);
      if (!responses) {
        throw new NotFoundException(`No responses found for application ID ${applicationId}`);
      }
      return responses;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch responses by application ID');
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
}