import { UnauthorizedError } from '../../../../errors/unauthorized.error';
import { AggregateRoot } from '../../../../framework/aggregate-root';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';
import { AccountPassword } from '../../../shared-kernel/core/account-password/account-password.value-object';
import { PasswordHashProviderService } from '../../../shared-kernel/core/account-password/password-hash-provider.service';
import { UserLoggedInEvent } from './events/user-logged-in.event';
import { CredentialsMustBeValidRule } from './rules/credentials-must-be-valid.rule';

interface AccountProps {
  password: AccountPassword;
}

interface PersistedAccount {
  id: string;
  passwordHash: string;
}

export class Account extends AggregateRoot<AccountProps> {
  private constructor(props: AccountProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ passwordHash, id }: PersistedAccount) {
    return new Account(
      {
        password: AccountPassword.fromPersistence(passwordHash),
      },
      new UniqueEntityID(id),
    );
  }

  public async login(password: string, passwordHashProviderService: PasswordHashProviderService) {
    await Account.checkRule(
      new CredentialsMustBeValidRule(this.props.password, password, passwordHashProviderService),
      UnauthorizedError,
    );

    this.apply(new UserLoggedInEvent(this.getId()));
  }
}
