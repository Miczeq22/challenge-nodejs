import { ApiProperty } from '@nestjs/swagger';
import { DeskSizeValue } from '../core/desk-size/desk-size.value-object';
import { DeskSpaceTypeValue } from '../core/desk-space-type/desk-space-type.value-object';

export class DeskCatalogueItemDTO {
  @ApiProperty({
    example: 'e2e1d3b0-cba4-43b4-9c6f-5b4727883540',
    type: 'uuid',
    description: 'Id of a Desk',
  })
  id: string;
  @ApiProperty({
    example: 'SMALL',
    type: 'string',
    enum: DeskSizeValue,
  })
  size: string;
  @ApiProperty({
    example: 'ShareSpace',
    type: 'string',
  })
  officeName: string;
  @ApiProperty({
    example: 'Warsaw',
    type: 'string',
  })
  location: string;
  @ApiProperty({
    example: 'COWORKING',
    type: 'string',
    enum: DeskSpaceTypeValue,
  })
  type: string;
}
