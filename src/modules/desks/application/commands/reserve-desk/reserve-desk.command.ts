import { ReserveDeskDTO } from '../../../dtos/reserve-desk.dto';

export class ReserveDeskCommand {
  constructor(public readonly payload: ReserveDeskDTO) {}
}
