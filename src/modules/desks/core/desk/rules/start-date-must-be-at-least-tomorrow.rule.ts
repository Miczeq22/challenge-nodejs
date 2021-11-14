import { BusinessRule } from '../../../../../framework/business-rule';
import { differenceInCalendarDays } from 'date-fns';

export class StartDateMustBeAtLeastTomorrowRule extends BusinessRule {
  message = 'Desk must be reserved with at least one day notice.';

  constructor(public readonly startDate: Date) {
    super();
  }

  public isBroken() {
    return differenceInCalendarDays(this.startDate, new Date()) <= 0;
  }
}
