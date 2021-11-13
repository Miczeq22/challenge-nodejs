import { Inject } from '@nestjs/common';
import { QueryBuilder } from '../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../infrastructure/database/table-names';
import { Account } from '../../core/account/account.aggregate-root';
import { AccountRepository } from '../../core/account/account.repository';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async findByEmail(email: string) {
    const result = await this.queryBuilder
      .select(['id', 'password AS passwordHash'])
      .from(TableNames.Account)
      .where('email', email)
      .first();

    return result ? Account.fromPersistence(result) : null;
  }
}
