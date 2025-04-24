import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import { User as UserEntity } from '@modules/users/domain/entities/user.entity';

import { User } from '../schemas/user.schema';

export class UserMappings {
  public static toDomain(user: User): UserEntity {
    const userDomain = new UserEntity();

    userDomain.email = user.email;
    userDomain.id = MongoMappings.toString(user._id);
    userDomain.name = user.name;
    userDomain.password = user.password;
    userDomain.createdAt = user.createdAt;
    userDomain.updatedAt = user.updatedAt;

    return userDomain;
  }
}
