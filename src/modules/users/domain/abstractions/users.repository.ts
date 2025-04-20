import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<null | User>;
  abstract findById(id: string): Promise<null | User>;
  abstract update(user: User): Promise<void>;
}
