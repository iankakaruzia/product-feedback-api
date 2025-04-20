import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface RequestUser {
  sub: string;
}

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request['user'] as RequestUser | undefined;

    if (!user) {
      throw new UnauthorizedException('Unable to get user id');
    }

    return user.sub;
  },
);
