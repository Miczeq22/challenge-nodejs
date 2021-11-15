import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHashProviderService } from '../../account-password/password-hash-provider.service';

@Injectable()
export class PasswordHashProviderServiceImpl implements PasswordHashProviderService {
  public async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async isValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
