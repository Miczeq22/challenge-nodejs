import { CancelDeskReservationDTO } from '../../../dtos/cancel-desk-reservation.dto';

export class CancelDeskReservationCommand {
  constructor(public readonly payload: CancelDeskReservationDTO) {}
}
