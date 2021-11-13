import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReserveDeskCommand } from 'src/modules/desks/application/commands/reserve-desk/reserve-desk.command';

@Controller('desks')
export class DesksController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('reserve')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  reserve() {
    this.commandBus.execute(new ReserveDeskCommand());
  }
}
