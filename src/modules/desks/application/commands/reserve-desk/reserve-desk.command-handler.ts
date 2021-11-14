import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UnauthenticatedError } from '../../../../../errors/unauthenticated.error';
import { DeskProviderService } from '../../../core/desk-provider/desk-provider.service';
import { UserReservationConsoleRepository } from '../../../core/user-reservation-console/user-reservation-console.repository';
import { ReserveDeskCommand } from './reserve-desk.command';

@CommandHandler(ReserveDeskCommand)
export class ReserveDeskCommandHandler implements ICommandHandler<ReserveDeskCommand> {
  constructor(
    @Inject('userReservationConsoleRepository')
    private readonly userReservationConsoleRepository: UserReservationConsoleRepository,
    private readonly eventBus: EventBus,
    @Inject('deskProviderService') private readonly deskProviderService: DeskProviderService,
  ) {}

  async execute(command: ReserveDeskCommand) {
    const {
      payload: { deskId, endDate, startDate, userId },
    } = command;

    const reservationConsole = await this.userReservationConsoleRepository.findByUserId(userId);

    if (!reservationConsole) {
      throw new UnauthenticatedError();
    }

    await reservationConsole.startReservationProcess(
      {
        deskId,
        startDate,
        endDate,
      },
      this.deskProviderService,
    );

    this.eventBus.publishAll(reservationConsole.getUncommittedEvents());

    reservationConsole.commit();
  }
}
