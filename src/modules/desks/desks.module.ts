import { Module } from '@nestjs/common';
import { ReserveDeskCommandHandler } from './application/commands/reserve-desk/reserve-desk.command-handler';
import { DesksController } from './api/rest/desks';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [DesksController],
  providers: [ReserveDeskCommandHandler],
})
export class DesksModule {}
