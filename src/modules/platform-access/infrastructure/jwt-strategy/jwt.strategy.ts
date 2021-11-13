import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedError } from '../../../../errors/unauthorized.error';
import { QueryBuilder } from '../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../infrastructure/database/table-names';

export interface JwtPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate({ sub }: JwtPayload) {
    const result = await this.queryBuilder
      .select(['id'])
      .where('id', sub)
      .from(TableNames.Account)
      .first();

    if (!result) {
      throw new UnauthorizedError();
    }

    return result;
  }
}
