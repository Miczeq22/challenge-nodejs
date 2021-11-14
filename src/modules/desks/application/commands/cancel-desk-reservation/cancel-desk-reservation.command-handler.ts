import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UnauthenticatedError } from '../../../../../errors/unauthenticated.error';
import { UserReservationConsoleRepository } from '../../../core/user-reservation-console/user-reservation-console.repository';
import { CancelDeskReservationCommand } from './cancel-desk-reservation.command';

@CommandHandler(CancelDeskReservationCommand)
export class CancelDeskReservationCommandHandler
  implements ICommandHandler<CancelDeskReservationCommand>
{
  constructor(
    @Inject('userReservationConsoleRepository')
    private readonly userReservationConsoleRepository: UserReservationConsoleRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: CancelDeskReservationCommand) {
    const {
      payload: { reservationId, userId },
    } = command;

    const reservationConsole = await this.userReservationConsoleRepository.findByUserId(userId);

    if (!reservationConsole) {
      throw new UnauthenticatedError();
    }

    reservationConsole.cancelReservation(reservationId);

    this.eventBus.publishAll(reservationConsole.getUncommittedEvents());

    reservationConsole.commit();
  }
}
