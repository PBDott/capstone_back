import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { DeleteClubDto } from './dto/delete-club.dto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClub(@Body() createClubDto: CreateClubDto) {
    return this.clubService.createClub(createClubDto);
  }

  @Get()
  async getAllClub() {
    try {
      return this.clubService.getAllClub();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all club');
    }
  }

  @Get(':id')
  async getClubById(@Param('id') id: string) {
    const clubId = parseInt(id);
    if (isNaN(clubId)) {
      throw new BadRequestException(`Invalid club ID: ${id}`);
    }
    try {
      const club = await this.clubService.getClubById(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Faild to get club');
    }
  }

  @Post('update')
  async updateClub(@Body() updateClubDto: UpdateClubDto) {
    const clubId = updateClubDto.id;
    if (isNaN(clubId)) {
      throw new BadRequestException(`Invalid club ID: ${clubId}`);
    }
    try {
      const club = await this.clubService.updateClub(clubId, updateClubDto);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Faild to update club');
    }
  }

  @Post('delete')
  async deleteClub(@Body() deleteClubDto: DeleteClubDto) {
    const clubId = deleteClubDto.id;
    if (isNaN(clubId)) {
      throw new BadRequestException(`Invalid club ID: ${clubId}`);
    }
    try {
      const club = await this.clubService.deleteClub(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete club');
    }
  }
}
