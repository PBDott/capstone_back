import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { DeleteClubDto } from './dto/delete-club.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) { }

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
  ) {
    try {
      const imageUrl = file ? `/uploads/${file.filename}` : null;
      const clubData = { ...createClubDto, imageUrl };
      return await this.clubService.createClub(clubData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create club with image');
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

  @Post('update')
  async updateClub(@Body() updateClubDto: UpdateClubDto,): Promise<Club> {
    const clubId = updateClubDto.clubId;
    try {
      const club = await this.clubService.updateClub(clubId, updateClubDto);
      if (!club) {
        throw new NotFoundException(`Club with Id ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update club');
    }

  }

  @Post('delete')
  async deleteClub(@Body() deleteClubDto: DeleteClubDto) {
    const clubId = deleteClubDto.clubId;
    try {
      const club = await this.clubService.deleteClub(clubId);
      if(!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete club');
    }
  }


}
