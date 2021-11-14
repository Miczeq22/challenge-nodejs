import { BusinessRule } from '../../../../../framework/business-rule';
import { differenceInCalendarDays } from 'date-fns';

export class DeskMustBeReservedForAtLeastOneDayRule extends BusinessRule {
  message = "Can't reserve desk. Desk must be reserved for at least one day.";

  constructor(public readonly startDate: Date, public readonly endDate: Date) {
    super();
  }

  public isBroken() {
    return differenceInCalendarDays(this.endDate, this.startDate) <= 0;
  }
}
