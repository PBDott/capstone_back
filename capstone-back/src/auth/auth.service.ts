import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository){}
  registerUser(registerData: RegisterUserDto) {
    return this.authRepository.registerUser(registerData);
  } 
}
