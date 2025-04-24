import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import { UsersRepository } from '@modules/users/domain/abstractions/users.repository';
import { User as UserEntity } from '@modules/users/domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserMappings } from './mappings/user.mappings';
import { User } from './schemas/user.schema';

export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(entity: UserEntity): Promise<void> {
    const user = new this.userModel({
      ...entity,
      _id: MongoMappings.toObjectId(entity.id),
    });

    await user.save();
  }

  async findByEmail(email: string): Promise<null | UserEntity> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return UserMappings.toDomain(user);
  }

  async findById(id: string): Promise<null | UserEntity> {
    const user = await this.userModel.findOne({
      _id: MongoMappings.toObjectId(id),
    });

    if (!user) {
      return null;
    }

    return UserMappings.toDomain(user);
  }

  async update(entity: UserEntity): Promise<void> {
    const { id, ...entityToUpdate } = entity;
    await this.userModel.findOneAndUpdate(
      { _id: MongoMappings.toObjectId(id) },
      entityToUpdate,
      {
        new: true,
      },
    );
  }
}
