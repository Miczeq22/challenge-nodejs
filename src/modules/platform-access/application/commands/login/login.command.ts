import { LoginDTO } from '../../../dtos/login.dto';

export class LoginCommand {
  constructor(public readonly payload: LoginDTO) {}
}
