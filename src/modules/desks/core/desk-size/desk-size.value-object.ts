import { ValueObject } from '../../../../framework/value-object';
import { DeskSizeNotSupportedError } from '../../errors/desk-size-not-supported.error';

export enum DeskSizeValue {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

interface DeskSizeProps {
  value: string;
}

export class DeskSize extends ValueObject<DeskSizeProps> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static Small = new DeskSize(DeskSizeValue.Small);

  public static Medium = new DeskSize(DeskSizeValue.Medium);

  public static Large = new DeskSize(DeskSizeValue.Large);

  public static fromValue(value: string) {
    switch (value) {
      case DeskSizeValue.Small:
        return this.Small;

      case DeskSizeValue.Medium:
        return this.Medium;

      case DeskSizeValue.Large:
        return this.Large;

      default:
        throw new DeskSizeNotSupportedError();
    }
  }

  public getValue() {
    return this.props.value;
  }
}
