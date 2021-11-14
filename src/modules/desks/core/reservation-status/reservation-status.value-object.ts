import { ValueObject } from '../../../../framework/value-object';
import { DeskStatusNotSupportedError } from '../../errors/desk-status-not-supported.error';

export enum ReservationStatusValue {
  Confirmed = 'CONFIRMED',
  Paid = 'PAID',
}

interface ReservationStatusProps {
  value: string;
}

export class ReservationStatus extends ValueObject<ReservationStatusProps> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static Confirmed = new ReservationStatus(ReservationStatusValue.Confirmed);

  public static Paid = new ReservationStatus(ReservationStatusValue.Paid);

  public static fromValue(value: string) {
    switch (value) {
      case ReservationStatusValue.Confirmed:
        return this.Confirmed;

      case ReservationStatusValue.Paid:
        return this.Paid;

      default:
        throw new DeskStatusNotSupportedError();
    }
  }

  public getValue() {
    return this.props.value;
  }
}
