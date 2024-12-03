import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClubRoles } from './clubRoles.decorator';
import { UpdateClubAdminDto } from './dto/update-club-admin.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from '@prisma/client';
import { DeleteClubDto } from './dto/delete-club.dto';

@Controller('club-admin')
export class ClubAdminController {
  constructor(private readonly clubAdminService: ClubAdminService) { }

  @Post('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ClubRoles('CLUBADMIN')
  async updateClub(@Body() updateClubDto: UpdateClubDto): Promise<Club> {
    const clubId = updateClubDto.clubId;
    try {
      const club = await this.clubAdminService.updateClub(clubId, updateClubDto);
      if (!club) {
        throw new NotFoundException(`Club with Id ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update club');
    }

  }

  @Post('delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ClubRoles('CLUBADMIN')
  async deleteClub(@Body() deleteClubDto: DeleteClubDto) {
    const clubId = deleteClubDto.clubId;
    try {
      const club = await this.clubAdminService.deleteClub(clubId);
      if (!club) {
        throw new NotFoundException(`Club with ID ${clubId} not found`);
      }
      return club;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete club');
    }
  }

  @Post('updateClubAdmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ClubRoles('CLUBADMIN')
  async updateClubAdmin(@Body() updateClubAdmindto: UpdateClubAdminDto) {
    const { clubId, userId } = updateClubAdmindto;

    try {
      return await this.clubAdminService.updateClubAdmin(clubId, userId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update club admin');
    }
  }
  /*
  @Post('getAllMember')
  async getAllMember(@Body() clubId: number) {
    try {
      const clubUsers = await this.clubAdminService.getAllMember(clubId);
      if (!clubUsers) {
        throw new NotFoundException(`No users found for club with ID ${clubId}`);
      }
      return clubUsers;
    } catch (error) {
      console.error("Error in getAllClubUser:", error);
      throw new InternalServerErrorException('Failed to retrieve club users');
    }
  }
  */

  @Post('getClubData')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ClubRoles('CLUBADMIN')
  async getClubData(@Req() req) {
    try {
      const { userId } = req.payload;
      return await this.clubAdminService.getClubData(userId);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to get club data');
    }
  }
}
