import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueryBuilder } from '../../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../../infrastructure/database/table-names';
import { UserLoggedInEvent } from '../../../core/account/events/user-logged-in.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInSubscriber implements IEventHandler<UserLoggedInEvent> {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async handle(event: UserLoggedInEvent) {
    await this.queryBuilder
      .update({
        last_login_date: new Date().toISOString(),
      })
      .where('id', event.accountId)
      .into(TableNames.Account);
  }
}
