import { Controller, Get, Post, Body, Param, InternalServerErrorException, NotFoundException, UseInterceptors, UploadedFile, Req, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'src/common/user.interface';
import { CreateClubRequestDto } from './dto/create-club-request.dto';


@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClub(
    @Body() createClubRequestDto: CreateClubRequestDto,
    @Req() req: Request,
  ) {
    try {
      const { userId } = req.payload;
      if (!userId) {
        throw new InternalServerErrorException('User ID is missing from the request.');
      }
      return this.clubService.createClub({ ...createClubRequestDto }, userId);
    } catch (error) {
      console.error('Error in createClub:', error);
      throw new InternalServerErrorException('Failed to create club');
    }
  }

  @Get()
  async getAllClub(): Promise<Club[]> {
    try {
      return this.clubService.getAllClub();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all club');
    }
  }

  @Get(':clubId')
  async getClubById(@Param('clubId') clubId: number): Promise<Club> {
    try {
      const club = await this.clubService.getClubById(clubId);
      if (!club) {
        throw new NotFoundException(`Club with Id ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get club by id');
    }
  }

  @Get('calendar')
  async getAllCalendars(@Query('clubId', ParseIntPipe) clubId: number) {
    try {
      return await this.clubService.getAllCalendars(clubId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch calendars');
    }
  }

  @Get('receipt')
  async getAllReceipts(@Query('clubId', ParseIntPipe) clubId: number) {
    try {
      return await this.clubService.getAllReceipts(clubId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch receipts');
    }
  }
}
