import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder } from '../../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../../infrastructure/database/table-names';
import { AccountEmailCheckerService } from '../../account-email/account-email-checker.service';

@Injectable()
export class AccountEmailCheckerServiceImpl implements AccountEmailCheckerService {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async isUnique(email: string) {
    const result = await this.queryBuilder
      .select('id')
      .where('email', email)
      .from(TableNames.Account);

    return result.length === 0;
  }
}
