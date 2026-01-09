import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InMemoryUserRepository } from './infrastructure/repository/in-memory-user.repository';
import { USER_REPOSITORY } from './domain/repository/user-repository.token';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class AuthModule {}
