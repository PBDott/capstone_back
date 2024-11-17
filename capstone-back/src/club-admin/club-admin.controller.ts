import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClubRoles } from './clubRoles.decorator';

@Controller('club-admin')
export class ClubAdminController {
  constructor(private readonly clubAdminService: ClubAdminService) {}
  
  @Get('test')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ClubRoles('CLUBADMIN')
  getClubAdminDashboard(@Req() req, @Res() res) {
    res.json({
        message: '동아리 관리자 접근 제어 테스트',
        userData: req.user 
    })
  }

}
