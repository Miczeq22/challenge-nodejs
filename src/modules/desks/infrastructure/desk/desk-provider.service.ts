import { Inject } from '@nestjs/common';
import { QueryBuilder } from '../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../infrastructure/database/table-names';
import { DeskProviderService } from '../../core/desk-provider/desk-provider.service';
import { Desk } from '../../core/desk/desk.entity';

export class DeskProviderServiceImpl implements DeskProviderService {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async findById(id: string) {
    const persistedDesk = await this.queryBuilder
      .select('id')
      .where('id', id)
      .from(TableNames.Desk)
      .first();

    if (!persistedDesk) {
      return null;
    }

    const currentReservations = await this.queryBuilder
      .select(['id', 'start_at AS startDate', 'end_at AS endDate', 'status'])
      .where('desk_id', id)
      .andWhere('end_at', '>=', new Date().toISOString())
      .from(TableNames.DeskReservation);

    return Desk.fromPersistence({
      currentReservations,
      id,
    });
  }
}
