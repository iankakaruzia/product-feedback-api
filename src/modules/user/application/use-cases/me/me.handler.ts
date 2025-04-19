import { UserRepository } from '@modules/user/domain/abstractions/user.repository';
import { UserNotFoundError } from '@modules/user/domain/errors/user-not-found.error';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserProfileDto } from '../../dtos/user-profile.dto';
import { MeQuery } from './me.query';

@QueryHandler(MeQuery)
export class MeHandler implements IQueryHandler<MeQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: MeQuery): Promise<UserProfileDto> {
    const user = await this.userRepository.findById(query.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      email: user.email,
      id: user.id,
      name: user.name,
    };
  }
}
