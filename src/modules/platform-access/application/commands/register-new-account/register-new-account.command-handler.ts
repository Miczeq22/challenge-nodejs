import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRegistration } from 'src/modules/platform-access/core/account-registration/account-registration.aggregate-root';
import { AccountRegistrationRepository } from 'src/modules/platform-access/core/account-registration/account-registration.repository';
import { AccountEmailCheckerService } from 'src/modules/shared-kernel/core/account-email/account-email-checker.service';
import { PasswordHashProviderService } from 'src/modules/shared-kernel/core/account-password/password-hash-provider.service';
import { RegisterNewAccountCommand } from 'src/modules/platform-access/application/commands/register-new-account/register-new-account.command';
import { Inject } from '@nestjs/common';

@CommandHandler(RegisterNewAccountCommand)
export class RegisterNewAccountCommandHandler
  implements ICommandHandler<RegisterNewAccountCommand>
{
  constructor(
    @Inject('accountRegistrationRepository')
    private readonly accountRegistrationRepository: AccountRegistrationRepository,
    @Inject('accountEmailCheckerService')
    private readonly accountEmailCheckerService: AccountEmailCheckerService,
    @Inject('passwordHashProviderService')
    private readonly passwordHashProviderService: PasswordHashProviderService,
  ) {}

  public async execute(command: RegisterNewAccountCommand) {
    const {
      payload: { email, password },
    } = command;

    const accountRegistration = await AccountRegistration.registerNew({
      email,
      password,
      accountEmailCheckerService: this.accountEmailCheckerService,
      passwordHashProviderService: this.passwordHashProviderService,
    });

    const trx = await this.accountRegistrationRepository.insert(accountRegistration);

    accountRegistration.commit();

    await trx.commit();
  }
}
