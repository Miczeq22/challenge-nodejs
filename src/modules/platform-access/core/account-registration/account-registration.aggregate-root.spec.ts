import { createMockProxy } from '../../../../tools/mock-proxy';
import { PasswordHashProviderService } from '../../../shared-kernel/core/account-password/password-hash-provider.service';
import { AccountEmailCheckerServiceImpl } from '../../../shared-kernel/core/infrastructure/account-email-checker/account-email-checker.service';
import { AccountRegistration } from './account-registration.aggregate-root';
import { NewAccountRegisteredEvent } from './events/new-account-registered.event';

describe('[DOMAIN] Account Registration', () => {
  const accountEmailCheckerService = createMockProxy<AccountEmailCheckerServiceImpl>();
  const passwordHashProviderService = createMockProxy<PasswordHashProviderService>();

  test('should throw an error if email has invalid format', async () => {
    await expect(() =>
      AccountRegistration.registerNew({
        accountEmailCheckerService,
        passwordHashProviderService,
        email: 'invalid-format',
        password: '#password',
      }),
    ).rejects.toThrowError('Provided email format is not valid.');
  });

  test('should throw an error if email is not unique', async () => {
    accountEmailCheckerService.isUnique.mockResolvedValue(false);

    await expect(() =>
      AccountRegistration.registerNew({
        accountEmailCheckerService,
        passwordHashProviderService,
        email: 'not-unique@gmail.com',
        password: '#password',
      }),
    ).rejects.toThrowError('Provided email address is already in use.');
  });

  test('should throw an error if password is not strong enough', async () => {
    accountEmailCheckerService.isUnique.mockResolvedValue(true);

    await expect(() =>
      AccountRegistration.registerNew({
        accountEmailCheckerService,
        passwordHashProviderService,
        email: 'unique@gmail.com',
        password: '#password',
      }),
    ).rejects.toThrowError(
      'Provided password is not strong enough. Provide password with minimum one digit.',
    );
  });

  test('should register new account', async () => {
    accountEmailCheckerService.isUnique.mockResolvedValue(true);

    const accountRegistration = await AccountRegistration.registerNew({
      accountEmailCheckerService,
      passwordHashProviderService,
      email: 'unique@gmail.com',
      password: 'test123',
    });

    expect(
      accountRegistration.getUncommittedEvents()[0] instanceof NewAccountRegisteredEvent,
    ).toBeTruthy();
  });
});
