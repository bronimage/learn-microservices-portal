import { UserStatus } from './user-status.enum';

export class User {
  constructor(
    public readonly username: string,
    public readonly password: string,
    private status: UserStatus = UserStatus.ACTIVE,
  ) {}

  isBlocked(): boolean {
    return this.status === UserStatus.BLOCKED;
  }

  block(): void {
    this.status = UserStatus.BLOCKED;
  }

  canLogin(): boolean {
    return this.status === UserStatus.ACTIVE;
  }
}
