import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from '../../../../../errors/unauthorized.error';
import { PasswordHashProviderService } from '../../../../shared-kernel/core/account-password/password-hash-provider.service';
import { AccountRepository } from '../../../core/account/account.repository';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject('accountRepository')
    private readonly accountRepository: AccountRepository,
    @Inject('passwordHashProviderService')
    private readonly passwordHashProviderService: PasswordHashProviderService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: LoginCommand) {
    const {
      payload: { email, password },
    } = command;

    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new UnauthorizedError();
    }

    await account.login(password, this.passwordHashProviderService);

    this.eventBus.publishAll(account.getUncommittedEvents());
    account.commit();

    const accessToken = this.jwtService.sign({
      sub: account.getId(),
    });

    return accessToken;
  }
}
