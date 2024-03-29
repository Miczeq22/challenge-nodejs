import { AggregateRoot } from '../../../../framework/aggregate-root';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import { AccountEmailCheckerService } from '../../../shared-kernel/core/account-email/account-email-checker.service';
import { AccountEmail } from '../../../shared-kernel/core/account-email/account-email.value-object';
import { AccountPassword } from '../../../shared-kernel/core/account-password/account-password.value-object';
import { PasswordHashProviderService } from '../../../shared-kernel/core/account-password/password-hash-provider.service';
import { RegisterNewAccountDTO } from '../../dtos/register-new-account.dto';
import { NewAccountRegisteredEvent } from './events/new-account-registered.event';

interface AccountRegistrationProps {
  email: AccountEmail;
  password: AccountPassword;
  registeredAt: Date;
}

interface RegisterNewAccountPayload extends RegisterNewAccountDTO {
  accountEmailCheckerService: AccountEmailCheckerService;
  passwordHashProviderService: PasswordHashProviderService;
}

export class AccountRegistration extends AggregateRoot<AccountRegistrationProps> {
  private constructor(props: AccountRegistrationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static async registerNew({
    email,
    password,
    accountEmailCheckerService,
    passwordHashProviderService,
  }: RegisterNewAccountPayload) {
    const account = new AccountRegistration({
      email: await AccountEmail.createNew(email, accountEmailCheckerService),
      password: await AccountPassword.createNew(password, passwordHashProviderService),
      registeredAt: new Date(),
    });

    account.apply(new NewAccountRegisteredEvent(email));

    return account;
  }

  public getEmail() {
    return this.props.email.toString();
  }

  public getPasswordHash() {
    return this.props.password.getValue();
  }

  public getRegisteredAt() {
    return this.props.registeredAt;
  }
}
