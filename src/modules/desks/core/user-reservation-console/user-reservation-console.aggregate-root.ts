import { NotFoundError } from '../../../../errors/not-found.error';
import { AggregateRoot } from '../../../../framework/aggregate-root';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import { ReserveDeskDTO } from '../../dtos/reserve-desk.dto';
import { DeskProviderService } from '../desk-provider/desk-provider.service';
import { PersistedReservedDesk, ReservedDesk } from '../reserved-desk/reserved-desk.entity';
import { DeskHasBeenReservedEvent } from './events/desk-has-been-reserved.event';
import { DeskReservationHasBeenCanceledEvent } from './events/desk-reservation-has-been-canceled.event';
import { DeskMustBeReservedByUserRule } from './rules/desk-must-be-reserved-by-user.rule';
import { DeskMustExistRule } from './rules/desk-must-exist.rule';
import { UserMustNotHaveMoreThanOneActiveReservationRule } from './rules/user-must-not-have-more-than-one-active-reservation.rule';

interface UserReservationConsoleProps {
  currentlyReservedDesks: ReservedDesk[];
}

export interface PersistedUserReservationConsole {
  id: string;
  currentlyReservedDesks: PersistedReservedDesk[];
}

export class UserReservationConsole extends AggregateRoot<UserReservationConsoleProps> {
  private constructor(props: UserReservationConsoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ id, currentlyReservedDesks }: PersistedUserReservationConsole) {
    return new UserReservationConsole(
      {
        currentlyReservedDesks: currentlyReservedDesks.map(ReservedDesk.fromPersistence),
      },
      new UniqueEntityID(id),
    );
  }

  public async startReservationProcess(
    { deskId, endDate, startDate }: Omit<ReserveDeskDTO, 'userId'>,
    deskProviderService: DeskProviderService,
  ) {
    UserReservationConsole.checkRule(
      new UserMustNotHaveMoreThanOneActiveReservationRule(this.props.currentlyReservedDesks),
    );

    const desk = await deskProviderService.findById(deskId);

    UserReservationConsole.checkRule(new DeskMustExistRule(desk), NotFoundError);

    const reservation = desk.reserve({
      startDate,
      endDate,
    });

    this.props.currentlyReservedDesks.push(ReservedDesk.createNew(deskId));

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

  public cancelReservation(reservationId: string) {
    const uniqueReservationId = new UniqueEntityID(reservationId);

    UserReservationConsole.checkRule(
      new DeskMustBeReservedByUserRule(uniqueReservationId, this.props.currentlyReservedDesks),
    );

    this.props.currentlyReservedDesks = this.props.currentlyReservedDesks.filter(
      (reservedDeskId) => !new UniqueEntityID(reservedDeskId.getId()).equals(uniqueReservationId),
    );

    this.apply(new DeskReservationHasBeenCanceledEvent(reservationId));
  }
}
