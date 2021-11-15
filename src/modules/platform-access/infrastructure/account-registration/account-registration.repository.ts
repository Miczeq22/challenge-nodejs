import { Inject } from '@nestjs/common';
import { QueryBuilder } from '../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../infrastructure/database/table-names';
import { AccountRegistration } from '../../core/account-registration/account-registration.aggregate-root';
import { AccountRegistrationRepository } from '../../core/account-registration/account-registration.repository';

export class AccountRegistrationRepositoryImpl implements AccountRegistrationRepository {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async insert(accountRegistration: AccountRegistration) {
    const trx = await this.queryBuilder.transaction();

    const record = {
      id: accountRegistration.getId(),
      email: accountRegistration.getEmail(),
      password: accountRegistration.getPasswordHash(),
      registered_at: accountRegistration.getRegisteredAt().toISOString(),
    };

    await trx.insert(record).into(TableNames.Account);

    return trx;
  }
}
