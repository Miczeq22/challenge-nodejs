import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueryBuilder } from '../../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../../infrastructure/database/table-names';
import { DeskReservationHasBeenCanceledEvent } from '../../../core/user-reservation-console/events/desk-reservation-has-been-canceled.event';

@EventsHandler(DeskReservationHasBeenCanceledEvent)
export class DeskReservationHasBeenCanceledSubscriber
  implements IEventHandler<DeskReservationHasBeenCanceledEvent>
{
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async handle(event: DeskReservationHasBeenCanceledEvent) {
    await this.queryBuilder
      .delete()
      .where('id', event.reservationId)
      .into(TableNames.DeskReservation);
  }
}
