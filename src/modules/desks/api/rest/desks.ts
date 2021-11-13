import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ReserveDeskCommand } from 'src/modules/desks/application/commands/reserve-desk/reserve-desk.command';

@Controller('desks')
export class DesksController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('reserve')
  reserve() {
    this.commandBus.execute(new ReserveDeskCommand());
  }
}
