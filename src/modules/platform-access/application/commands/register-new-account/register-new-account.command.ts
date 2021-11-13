import { RegisterNewAccountDTO } from 'src/modules/platform-access/dtos/register-new-account.dto';

export class RegisterNewAccountCommand {
  constructor(public readonly payload: RegisterNewAccountDTO) {}
}
