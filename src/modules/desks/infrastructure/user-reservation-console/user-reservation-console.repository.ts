import { Inject } from '@nestjs/common';
import { QueryBuilder } from '../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../infrastructure/database/table-names';
import { UserReservationConsole } from '../../core/user-reservation-console/user-reservation-console.aggregate-root';
import { UserReservationConsoleRepository } from '../../core/user-reservation-console/user-reservation-console.repository';

export class UserReservationConsoleRepositoryImpl implements UserReservationConsoleRepository {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async findByUserId(userId: string) {
    const accountRecord = await this.queryBuilder
      .select('id')
      .where('id', userId)
      .from(TableNames.Account);

    if (!accountRecord) {
      return null;
    }

    const currentlyReservedDesks = await this.queryBuilder
      .select(['id', 'desk_id AS deskId'])
      .where('account_id', userId)
      .andWhere('end_at', '>=', new Date().toISOString())
      .from(TableNames.DeskReservation);

    return UserReservationConsole.fromPersistence({
      currentlyReservedDesks,
      id: userId,
    });
  }
}
