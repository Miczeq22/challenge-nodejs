import { BusinessRule } from '../../../../../framework/business-rule';
import { Desk } from '../../desk/desk.entity';

export class DeskMustExistRule extends BusinessRule {
  message = 'Selected desk does not exist.';

  constructor(private readonly desk: Desk | null) {
    super();
  }

  public isBroken() {
    return this.desk === null;
  }
}
