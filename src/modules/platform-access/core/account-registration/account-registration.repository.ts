import { DatabaseTransaction } from 'src/infrastructure/database/database-transaction';
import { AccountRegistration } from './account-registration.aggregate-root';

export interface AccountRegistrationRepository {
  insert(accountRegistration: AccountRegistration): Promise<DatabaseTransaction>;
}
