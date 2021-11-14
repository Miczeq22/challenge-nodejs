import { AggregateRoot } from '../../../../framework/aggregate-root';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import { ReserveDeskDTO } from '../../dtos/reserve-desk.dto';
import { DeskProviderService } from '../desk-provider/desk-provider.service';
import { DeskHasBeenReservedEvent } from './events/desk-has-been-reserved.event';
import { DeskMustExistRule } from './rules/desk-must-exist.rule';
import { UserMustNotHaveMoreThanOneActiveReservationRule } from './rules/user-must-not-have-more-than-one-active-reservation.rule';

interface UserReservationConsoleProps {
  currentlyReservedDeskIDs: UniqueEntityID[];
}

export interface PersistedUserReservationConsole {
  id: string;
  currentlyReservedDeskIDs: string[];
}

export class UserReservationConsole extends AggregateRoot<UserReservationConsoleProps> {
  private constructor(props: UserReservationConsoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ id, currentlyReservedDeskIDs }: PersistedUserReservationConsole) {
    return new UserReservationConsole(
      {
        currentlyReservedDeskIDs: currentlyReservedDeskIDs.map((id) => new UniqueEntityID(id)),
      },
      new UniqueEntityID(id),
    );
  }

  public async startReservationProcess(
    { deskId, endDate, startDate }: Omit<ReserveDeskDTO, 'userId'>,
    deskProviderService: DeskProviderService,
  ) {
    UserReservationConsole.checkRule(
      new UserMustNotHaveMoreThanOneActiveReservationRule(this.props.currentlyReservedDeskIDs),
    );

    const desk = await deskProviderService.findById(deskId);

    UserReservationConsole.checkRule(new DeskMustExistRule(desk));

    const reservation = desk.reserve({
      startDate,
      endDate,
    });

    this.apply(
      new DeskHasBeenReservedEvent(
        reservation.getId(),
        desk.getId(),
        this.getId(),
        new Date(startDate),
        new Date(endDate),
      ),
    );
  }
}
