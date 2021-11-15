import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import { RegisterNewAccountCommand } from './register-new-account.command';
import { AccountRegistrationRepository } from '../../../core/account-registration/account-registration.repository';
import { AccountEmailCheckerService } from '../../../../shared-kernel/core/account-email/account-email-checker.service';
import { PasswordHashProviderService } from '../../../../shared-kernel/core/account-password/password-hash-provider.service';
import { AccountRegistration } from '../../../core/account-registration/account-registration.aggregate-root';

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
    private readonly eventBus: EventBus,
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

    this.eventBus.publishAll(accountRegistration.getUncommittedEvents());

    this.eventBus.register();

    accountRegistration.commit();

    await trx.commit();
  }
}
