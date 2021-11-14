import { ValueObject } from '../../../../framework/value-object';
import { DeskStatusNotSupportedError } from '../../errors/desk-status-not-supported.error';

export enum DeskStatusValue {
  Confirmed = 'CONFIRMED',
  Paid = 'PAID',
}

interface DeskStatusProps {
  value: string;
}

export class DeskStatus extends ValueObject<DeskStatusProps> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static Confirmed = new DeskStatus(DeskStatusValue.Confirmed);

  public static Paid = new DeskStatus(DeskStatusValue.Paid);

  public static fromValue(value: string) {
    switch (value) {
      case DeskStatusValue.Confirmed:
        return this.Confirmed;

      case DeskStatusValue.Paid:
        return this.Paid;

      default:
        throw new DeskStatusNotSupportedError();
    }
  }

  public getValue() {
    return this.props.value;
  }
}
