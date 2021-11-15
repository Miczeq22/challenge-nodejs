import { createMockProxy } from '../../../../tools/mock-proxy';
import { PasswordHashProviderService } from '../../../shared-kernel/core/account-password/password-hash-provider.service';
import { Account } from './account.aggregate-root';
import { UserLoggedInEvent } from './events/user-logged-in.event';

describe('[DOMAIN] Account', () => {
  const passwordHashProvider = createMockProxy<PasswordHashProviderService>();

  beforeEach(() => {
    passwordHashProvider.mockClear();
  });

  test('should throw an error if credentials are invalid', async () => {
    passwordHashProvider.isValidPassword.mockResolvedValue(false);

    const account = Account.fromPersistence({
      id: '#id',
      passwordHash: '#password-hash',
    });

    await expect(() =>
      account.login('#invalid-password', passwordHashProvider),
    ).rejects.toThrowError('Unauthorized.');
  });

  test('should login and propagate correct event', async () => {
    passwordHashProvider.isValidPassword.mockResolvedValue(true);

    const account = Account.fromPersistence({
      id: '#id',
      passwordHash: '#password-hash',
    });

    await account.login('#valid-password', passwordHashProvider);

    expect(account.getUncommittedEvents()[0] instanceof UserLoggedInEvent).toBeTruthy();
  });
});
