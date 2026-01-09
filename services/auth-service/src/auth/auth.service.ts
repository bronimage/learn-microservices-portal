import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './domain/user';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    const user = new User(loginDto.username, loginDto.password);

    return { success: true, message: 'Logged in', data: user };
  }

  register(registerDto: RegisterDto) {
    const user = new User(registerDto.username, registerDto.password);

    return { success: true, message: 'Registered', data: user };
  }
}
