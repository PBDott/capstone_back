import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Club, User } from '@prisma/client';
import { AdminService } from './admin.service';
import { ChangeAdminDto } from './dto/admin-role.dto';
import { UpdateClubStatusDto } from './dto/update-club-status.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAdminDashboard(@Req() req, @Res() res) {
    res.json({
        message: '관리자 접근 제어 테스트',
        userData: req.user 
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('test2')
  getProtected(@Req() req) {
    console.log(req.user);
    return req.user; 
  }

  @Post("changeAdmin") // 일단 테스트 하기 편하게 role 안씀 ㅇㅅㅇ
  async changeAdmin(@Body() changeAdminDto: ChangeAdminDto): Promise<User> {
    const userId = changeAdminDto.userId;
    try {
      const user = await this.adminService.changeAdmin(userId);
      if (!user) {
        throw new NotFoundException(`change admin with ID ${userId} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to change user role to admin');
    }
  }

  
  @Post("getPendingClubs")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getPendingClubs(): Promise<Club[]> {
    try {
      const clubs = await this.adminService.getPendingClubs();
      if (!clubs) {
        throw new NotFoundException(`pending club not found`);
      }
      return clubs;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get pending club');
    }
  }

  @Post("updateClubStatus")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateClubStatus(@Body() updateClubStatusDto: UpdateClubStatusDto): Promise<Club> {
    try {
      const club = await this.adminService.updateClubStatus(updateClubStatusDto);
      if(!club) {
        throw new NotFoundException(`Club with ID ${updateClubStatusDto.clubId} not found`);
      }
      return club;
    } catch (error) {
      console.error('Error in updateClubStatus:', error); 
      throw new InternalServerErrorException('Failed to updaste club status');
    }
  } 

  @Post("getAllUsers")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.adminService.getAllUsers();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

}
