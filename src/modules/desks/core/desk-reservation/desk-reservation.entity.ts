import { Entity } from '../../../../framework/entity';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import { ReservationStatus } from '../reservation-status/reservation-status.value-object';

interface DeskReservationProps {
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
}

export interface PersistedDeskReservation {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
}

export class DeskReservation extends Entity<DeskReservationProps> {
  private constructor(props: DeskReservationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ id, startDate, endDate, status }: PersistedDeskReservation) {
    return new DeskReservation(
      {
        endDate: new Date(endDate),
        startDate: new Date(startDate),
        status: ReservationStatus.fromValue(status),
      },
      new UniqueEntityID(id),
    );
  }

  public static createNew(startDate: Date, endDate: Date) {
    return new DeskReservation({
      startDate,
      endDate,
      status: ReservationStatus.Paid,
    });
  }

  public getStartDate() {
    return this.props.startDate;
  }

  public getEndDate() {
    return this.props.endDate;
  }
}
