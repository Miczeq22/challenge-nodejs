import { BusinessRule } from '../../../../../framework/business-rule';
import { AccountPassword } from '../../../../shared-kernel/core/account-password/account-password.value-object';
import { PasswordHashProviderService } from '../../../../shared-kernel/core/account-password/password-hash-provider.service';

export class CredentialsMustBeValidRule extends BusinessRule {
  message = 'Unauthorized.';

  constructor(
    private readonly accountPassword: AccountPassword,
    private readonly rawPassword: string,
    private readonly passwordHashProviderService: PasswordHashProviderService,
  ) {
    super();
  }

  public async isBroken() {
    return !(await this.accountPassword.isValid(
      this.rawPassword,
      this.passwordHashProviderService,
    ));
  }
}
