import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { User } from './domain/user';
import type { UserRepository } from './domain/repository/user.repository';
import { USER_REPOSITORY } from './domain/repository/user-repository.token';

// Application service: orchestrates use cases and coordinates domain + persistence
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return null;
    }

    if (!user.canLogin()) {
      throw new UnauthorizedException('User is blocked');
    }

    // warning - inconsistent in one hand success false in the other exception is thrown.

    return user;
  }

  async register(user: User) {
    await this.userRepository.save(user);

    return { success: true, message: 'Registered', data: user };
  }
}
