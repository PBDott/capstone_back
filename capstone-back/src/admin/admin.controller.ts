import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
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
}
