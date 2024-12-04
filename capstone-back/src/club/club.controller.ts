import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException, UseInterceptors, UploadedFile, Req, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { DeleteClubDto } from './dto/delete-club.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // 파일을 저장할 경로
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createClub(
    @UploadedFile() file: Express.Multer.File,
    @Body() createClubDto: CreateClubDto,
    @Req() req,
  ) {
    try {
      const imageUrl = file ? `/uploads/${file.filename}` : null;
      const { userId } = req.payload;

      if (!userId) {
        throw new InternalServerErrorException('User ID is missing from the request.');
      }

      const clubData = { ...createClubDto, imageUrl };
      return await this.clubService.createClub(clubData, userId);
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
  async getClubById(@Param('clubId', ParseIntPipe) clubId: number): Promise<Club> {
    try {
      const club = await this.clubService.getClubById(clubId);
      if (!club) {
        throw new NotFoundException(`Club with Id ${clubId} not found`);
      }
      return club;
    } catch (error) {
      console.error('Error:', error);
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
