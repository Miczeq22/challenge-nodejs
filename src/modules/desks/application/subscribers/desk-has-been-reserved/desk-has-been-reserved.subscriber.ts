import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueryBuilder } from '../../../../../infrastructure/database/query-builder';
import { TableNames } from '../../../../../infrastructure/database/table-names';
import { DeskHasBeenReservedEvent } from '../../../core/user-reservation-console/events/desk-has-been-reserved.event';
import { ReservationStatusValue } from '../../../core/reservation-status/reservation-status.value-object';

@EventsHandler(DeskHasBeenReservedEvent)
export class DeskHasBeenReservedSubscriber implements IEventHandler<DeskHasBeenReservedEvent> {
  constructor(@Inject('queryBuilder') private readonly queryBuilder: QueryBuilder) {}

  public async handle(event: DeskHasBeenReservedEvent) {
    await this.queryBuilder
      .insert({
        id: event.reservationId,
        desk_id: event.deskId,
        account_id: event.userId,
        start_at: event.startDate.toISOString(),
        end_at: event.endDate.toISOString(),
        status: ReservationStatusValue.Paid,
        reserved_at: new Date().toISOString(),
      })
      .into(TableNames.DeskReservation);
  }
}
