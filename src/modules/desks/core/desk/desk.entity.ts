import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import {
  DeskReservation,
  PersistedDeskReservation,
} from '../desk-reservation/desk-reservation.entity';
import { StartDateMustBeAtLeastTomorrowRule } from './rules/start-date-must-be-at-least-tomorrow.rule';
import { DeskMustBeReservedForAtLeastOneDayRule } from './rules/desk-must-be-reserved-for-at-least-one-day.rule';
import { DeskMustBeAvailableToReserveRule } from './rules/desk-must-be-available-to-reserve.rule';
import { ReserveDeskDTO } from '../../dtos/reserve-desk.dto';
import { Entity } from '../../../../framework/entity';

interface DeskProps {
  currentReservations: DeskReservation[];
}

export interface PersistedDesk {
  id: string;
  currentReservations: PersistedDeskReservation[];
}

export class Desk extends Entity<DeskProps> {
  private constructor(props: DeskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ currentReservations, id }: PersistedDesk) {
    return new Desk(
      {
        currentReservations: currentReservations.map(DeskReservation.fromPersistence),
      },
      new UniqueEntityID(id),
    );
  }

  public reserve({
    endDate: endDateTimestamp,
    startDate: startDateTimestamp,
  }: Omit<ReserveDeskDTO, 'deskId' | 'userId'>) {
    const startDate = new Date(startDateTimestamp);
    const endDate = new Date(endDateTimestamp);

    Desk.checkRule(new StartDateMustBeAtLeastTomorrowRule(startDate));
    Desk.checkRule(new DeskMustBeReservedForAtLeastOneDayRule(startDate, endDate));
    Desk.checkRule(new DeskMustBeAvailableToReserveRule(startDate, this.props.currentReservations));

    const reservation = DeskReservation.createNew(startDate, endDate);

    this.props.currentReservations.push(reservation);

    return reservation;
  }
}
