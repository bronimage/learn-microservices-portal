import { Injectable, Inject } from '@nestjs/common';
import { User } from './domain/user';
import type { UserRepository } from './domain/repository/user.repository';
import { USER_REPOSITORY } from './domain/repository/user-repository.token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, message: 'Logged in', data: user };
  }

  async register(user: User) {
    await this.userRepository.save(user);

    return { success: true, message: 'Registered', data: user };
  }
}
