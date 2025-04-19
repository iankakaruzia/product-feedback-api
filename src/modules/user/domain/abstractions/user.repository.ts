import { Repository } from '@common/domain/repositories/repository';

import { User } from '../entities/user.entity';

export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<null | User>;
}
