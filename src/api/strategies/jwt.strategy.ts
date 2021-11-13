import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { QueryBuilder } from '../../infrastructure/database/query-builder';
import { TableNames } from '../../infrastructure/database/table-names';
import { ExtractJwt } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload) {
    const user = await this.queryBuilder
      .select('id')
      .where('id', payload.sub)
      .from(TableNames.Account)
      .first();

    if (!user) {
      throw new UnauthorizedError();
    }

    return user;
  }
}
