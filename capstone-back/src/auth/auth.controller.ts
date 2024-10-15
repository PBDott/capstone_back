import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async health(){
    return 'health'
  }

  @Post('register')
  async register(@Body() registerData : RegisterUserDto) {
    return this.authService.registerUser(registerData);
  }

  
}
