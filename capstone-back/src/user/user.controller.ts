import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'src/common/user.interface';
// import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(
    @Req() req: Request,
  ) {
    const { userId } = req.user;
    const integratedUserInfo = await this.userService.getUserInfo(userId);
    return integratedUserInfo;
  }
}
