import { Module } from '@nestjs/common';
import { ReserveDeskCommandHandler } from './application/commands/reserve-desk/reserve-desk.command-handler';
import { DesksController } from './api/rest/desks';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { GetAllDesksQueryHandler } from './application/queries/get-all-desks/get-all-desks.query-handler';
import { postgresQueryBuilder } from '../../infrastructure/database/query-builder';

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
    {
      provide: 'queryBuilder',
      useValue: postgresQueryBuilder(),
    },
  ],
})
export class DesksModule {}
