import { Controller, Get, Next, Post, Query, Response, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NextFunction, Response as ExpressResponse } from 'express';
import { ReserveDeskCommand } from 'src/modules/desks/application/commands/reserve-desk/reserve-desk.command';
import { GetAllDesksQuery } from '../../application/queries/get-all-desks/get-all-desks.query';
import { DeskCatalogueItemDTO } from '../../dtos/desk-catalogue-item.dto';

@ApiTags('Desks')
@Controller('desks')
export class DesksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary: 'Fetches all available desks in paginated manner.',
  })
  @ApiResponse({
    status: 200,
    description: 'All available desks fetched successfully.',
    type: [DeskCatalogueItemDTO],
  })
  @Get()
  @ApiQuery({
    name: 'start',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
  })
  public getAllDesks(
    @Query('start') start: number,
    @Query('limit') limit: number,
    @Response() res: ExpressResponse,
    @Next() next: NextFunction,
  ) {
    this.queryBus
      .execute(
        new GetAllDesksQuery({
          start: Number(start),
          limit: Number(limit),
        }),
      )
      .then((desks) => res.status(200).json(desks))
      .catch(next);
  }

  @Post('reserve')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  reserve() {
    this.commandBus.execute(new ReserveDeskCommand());
  }
}
