import { BusinessRule } from '../../../../../framework/business-rule';
import { DeskReservation } from '../../desk-reservation/desk-reservation.entity';
import { isWithinInterval } from 'date-fns';

export class DeskMustBeAvailableToReserveRule extends BusinessRule {
  message =
    'This period for selected desk is already taken. Please select different date for reservation.';

  constructor(
    public readonly startDate: Date,
    public readonly currentReservations: DeskReservation[],
  ) {
    super();
  }

  public isBroken() {
    return this.currentReservations.some((reservation) =>
      isWithinInterval(this.startDate, {
        start: reservation.getStartDate(),
        end: reservation.getEndDate(),
      }),
    );
  }
}
