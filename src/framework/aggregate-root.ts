import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs';
import { AppError } from 'src/errors/app.error';
import { BusinessRuleValidationError } from 'src/errors/business-rule-validation.error';
import { AsyncFunction } from './async-function';
import { BusinessRule } from './business-rule';
import { UniqueEntityID } from './unique-entity-id';

export class AggregateRoot<AggregateProps> extends NestAggregateRoot {
  constructor(
    protected readonly props: AggregateProps,
    protected readonly id = new UniqueEntityID(),
  ) {
    super();
  }

  protected static checkRule(
    rule: BusinessRule,
    ErrorType: typeof AppError = BusinessRuleValidationError,
  ): Promise<void> | void {
    if (rule.isBroken instanceof Promise || rule.isBroken instanceof AsyncFunction) {
      return (rule.isBroken() as Promise<boolean>).then((isBroken) => {
        if (isBroken) {
          throw new ErrorType(rule.message);
        }
      });
    }

    if (rule.isBroken()) {
      throw new ErrorType(rule.message);
    }
  }

  public getId() {
    return this.id.getValue();
  }
}
