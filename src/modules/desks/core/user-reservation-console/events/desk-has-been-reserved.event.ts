export class DeskHasBeenReservedEvent {
  constructor(
    public readonly reservationId: string,
    public readonly deskId: string,
    public readonly userId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
