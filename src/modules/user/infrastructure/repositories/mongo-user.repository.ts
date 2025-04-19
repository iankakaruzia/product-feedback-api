import { UserRepository } from '@modules/user/domain/abstractions/user.repository';
import { User as UserEntity } from '@modules/user/domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserMappings } from './mappings/user.mappings';
import { User } from './schemas/user.schema';

export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(entity: UserEntity): Promise<void> {
    const user = new this.userModel(entity);

    await user.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ id });
  }

  async findByEmail(email: string): Promise<null | UserEntity> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return UserMappings.toDomain(user.toObject());
  }

  async findById(id: string): Promise<null | UserEntity> {
    const user = await this.userModel.findOne({ id });

    if (!user) {
      return null;
    }

    return UserMappings.toDomain(user.toObject());
  }

  async update(entity: UserEntity): Promise<void> {
    await this.userModel.findOneAndUpdate({ id: entity.id }, entity, {
      new: true,
    });
  }
}
