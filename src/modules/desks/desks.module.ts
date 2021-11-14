import { Module } from '@nestjs/common';
import { ReserveDeskCommandHandler } from './application/commands/reserve-desk/reserve-desk.command-handler';
import { DesksController } from './api/rest/desks.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { GetAllDesksQueryHandler } from './application/queries/get-all-desks/get-all-desks.query-handler';
import { postgresQueryBuilder } from '../../infrastructure/database/query-builder';
import { DeskHasBeenReservedSubscriber } from './application/subscribers/desk-has-been-reserved/desk-has-been-reserved.subscriber';
import { UserReservationConsoleRepositoryImpl } from './infrastructure/user-reservation-console/user-reservation-console.repository';
import { DeskProviderServiceImpl } from './infrastructure/desk/desk-provider.service';

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [DesksController],
  providers: [
    ReserveDeskCommandHandler,
    GetAllDesksQueryHandler,
    DeskHasBeenReservedSubscriber,
    {
      provide: 'queryBuilder',
      useValue: postgresQueryBuilder(),
    },
    {
      provide: 'userReservationConsoleRepository',
      useClass: UserReservationConsoleRepositoryImpl,
    },
    {
      provide: 'deskProviderService',
      useClass: DeskProviderServiceImpl,
    },
  ],
})
export class DesksModule {}
