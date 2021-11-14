import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryBuilder } from '../../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../../infrastructure/database/table-names';
import { DEFAULT_LIMIT, PaginatedResponse } from '../../../../../tools/pagination';
import { DeskCatalogueItemDTO } from '../../../dtos/desk-catalogue-item.dto';
import { GetAllDesksQuery } from './get-all-desks.query';

@QueryHandler(GetAllDesksQuery)
export class GetAllDesksQueryHandler
  implements IQueryHandler<GetAllDesksQuery, PaginatedResponse<DeskCatalogueItemDTO>>
{
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async execute(query: GetAllDesksQuery) {
    const { start = 0, limit = DEFAULT_LIMIT } = query.pagination;

    const total = await this.queryBuilder.count('id').from(TableNames.Desk).first();

    const items: DeskCatalogueItemDTO[] = await this.queryBuilder
      .select(['id', 'size', 'office_name AS officeName', 'location', 'type'])
      .from(TableNames.Desk)
      .orderBy('id')
      .offset(start)
      .limit(limit - start);

    return {
      total: Number(total.count),
      items,
    };
  }
}
