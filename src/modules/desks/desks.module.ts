import { Module } from '@nestjs/common';
import { ReserveDeskCommandHandler } from './application/commands/reserve-desk/reserve-desk.command-handler';
import { DesksController } from './api/rest/desks';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [DesksController],
  providers: [ReserveDeskCommandHandler],
})
export class DesksModule {}
