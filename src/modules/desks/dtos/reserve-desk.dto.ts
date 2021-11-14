import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsISO8601 } from 'class-validator';

export class ReserveDeskDTO {
  @IsUUID()
  deskId: string;
  @IsUUID()
  userId: string;
  startDate: string;
  endDate: string;
}

export class ReserveDeskBodyDTO {
  @ApiProperty({
    example: '2021-11-14T15:29:58.850Z',
    description: 'Start date of the reservation.',
  })
  startDate: string;
  @IsISO8601({
    strict: true,
  })
  @ApiProperty({ example: '2021-11-20T15:29:58.850Z', description: 'End date of the reservation.' })
  endDate: string;
}
