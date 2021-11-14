import { BusinessRule } from '../../../../../framework/business-rule';
import { ReservedDesk } from '../../reserved-desk/reserved-desk.entity';

export class UserMustNotHaveMoreThanOneActiveReservationRule extends BusinessRule {
  message = "Can't reserve desk. You can have only one active desk reservation at a time.";

  constructor(private readonly currentlyReservedDesks: ReservedDesk[]) {
    super();
  }

  public isBroken() {
    return this.currentlyReservedDesks.length > 0;
  }
}
