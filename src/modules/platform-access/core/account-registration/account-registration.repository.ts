import { DatabaseTransaction } from '../../../../infrastructure/database/database-transaction';
import { AccountRegistration } from './account-registration.aggregate-root';

export interface AccountRegistrationRepository {
  insert(accountRegistration: AccountRegistration): Promise<DatabaseTransaction>;
}
