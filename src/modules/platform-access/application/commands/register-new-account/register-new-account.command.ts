import { RegisterNewAccountDTO } from '../../../dtos/register-new-account.dto';

export class RegisterNewAccountCommand {
  constructor(public readonly payload: RegisterNewAccountDTO) {}
}
