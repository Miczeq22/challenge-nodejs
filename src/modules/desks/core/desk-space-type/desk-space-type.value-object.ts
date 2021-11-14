import { ValueObject } from '../../../../framework/value-object';
import { DeskSpaceTypeNotSupportedError } from '../../errors/desk-space-type-not-supported.error';

export enum DeskSpaceTypeValue {
  Individual = 'INDIVIDUAL',
  Coworking = 'COWORKING',
}

interface DeskSpaceTypeProps {
  value: string;
}

export class DeskSpaceType extends ValueObject<DeskSpaceTypeProps> {
  private constructor(value: string) {
    super({
      value,
    });
  }

  public static Individual = new DeskSpaceType(DeskSpaceTypeValue.Individual);

  public static Coworking = new DeskSpaceType(DeskSpaceTypeValue.Coworking);

  public static fromValue(value: string) {
    switch (value) {
      case DeskSpaceTypeValue.Coworking:
        return this.Coworking;

      case DeskSpaceTypeValue.Individual:
        return this.Individual;

      default:
        throw new DeskSpaceTypeNotSupportedError();
    }
  }

  public getValue() {
    return this.props.value;
  }
}
