import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './domain/user';
import { NotFoundException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Logged in',
      username: user.username,
    };
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    const user = new User(registerDto.username, registerDto.password);
    return this.authService.register(user);
  }
}
