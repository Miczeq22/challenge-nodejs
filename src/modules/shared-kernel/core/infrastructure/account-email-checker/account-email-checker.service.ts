import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/infrastructure/database/query-builder';
import { TableNames } from 'src/infrastructure/database/table-names';
import { AccountEmailCheckerService } from 'src/modules/shared-kernel/core/account-email/account-email-checker.service';

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
