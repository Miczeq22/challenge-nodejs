import { BusinessRule } from '../../../../../framework/business-rule';
import { UniqueEntityID } from '../../../../../framework/unique-entity-id';
import { ReservedDesk } from '../../reserved-desk/reserved-desk.entity';

export class DeskMustBeReservedByUserRule extends BusinessRule {
  message = "Can't cancel desk reservation. Selected desk is not currently reserved by you.";

  constructor(
    private readonly reservationId: UniqueEntityID,
    private readonly currentlyReservedDesks: ReservedDesk[],
  ) {
    super();
  }

  public isBroken() {
    return !this.currentlyReservedDesks.some((reservedDesk) =>
      new UniqueEntityID(reservedDesk.getId()).equals(this.reservationId),
    );
  }
}
