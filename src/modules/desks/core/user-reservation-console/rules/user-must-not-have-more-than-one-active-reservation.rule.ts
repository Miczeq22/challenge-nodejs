import { BusinessRule } from '../../../../../framework/business-rule';
import { UniqueEntityID } from '../../../../../framework/unique-entity-id';

export class UserMustNotHaveMoreThanOneActiveReservationRule extends BusinessRule {
  message = "Can't reserve desk. You can have only one active desk reservation at a time.";

  constructor(private readonly currentlyReservedDeskIds: UniqueEntityID[]) {
    super();
  }

  public isBroken() {
    return this.currentlyReservedDeskIds.length > 0;
  }
}
