import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReserveDeskCommand } from './reserve-desk.command';

@CommandHandler(ReserveDeskCommand)
export class ReserveDeskCommandHandler implements ICommandHandler<ReserveDeskCommand> {
  async execute(command: ReserveDeskCommand) {
    // do stuff
  }
}
