import { User } from '../../domain/user';
import { UserRepository } from '../../domain/repository/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async save(user: User): Promise<void> {
    this.users.set(user.username, user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.get(username) ?? null;
  }
}
