import { User } from '../../domain/user';
import { UserRepository } from '../../domain/repository/user.repository';
import { UserPersistence } from '../persistence/user.persistence';
import { randomUUID } from 'crypto';
import { ConflictException } from '@nestjs/common';

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, UserPersistence>();

  async save(user: User): Promise<void> {
    if (this.users.has(user.username)) {
      throw new ConflictException('User already exists');
    }

    const persistenceUser: UserPersistence = {
      id: randomUUID(),
      username: user.username,
      password_hash: user.password,
      created_at: new Date(),
    };

    this.users.set(persistenceUser.username, persistenceUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const persistenceUser = this.users.get(username);
    if (!persistenceUser) return null;

    return new User(persistenceUser.username, persistenceUser.password_hash);
  }
}
