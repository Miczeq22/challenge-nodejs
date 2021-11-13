import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { postgresQueryBuilder } from '../../infrastructure/database/query-builder';
import { AccountEmailCheckerServiceImpl } from '../shared-kernel/core/infrastructure/account-email-checker/account-email-checker.service';
import { PasswordHashProviderServiceImpl } from '../shared-kernel/core/infrastructure/password-hash-provider/password-hash-provider.service';
import { PlatformAccessController } from './api/rest/platform-access.controller';
import { RegisterNewAccountCommandHandler } from './application/commands/register-new-account/register-new-account.command-handler';
import { AccountRegistrationRepositoryImpl } from './infrastructure/account-registration/account-registration.repository';

@Module({
  imports: [CqrsModule],
  controllers: [PlatformAccessController],
  providers: [
    RegisterNewAccountCommandHandler,
    {
      provide: 'accountRegistrationRepository',
      useClass: AccountRegistrationRepositoryImpl,
    },
    {
      provide: 'queryBuilder',
      useValue: postgresQueryBuilder(),
    },
    {
      provide: 'accountEmailCheckerService',
      useClass: AccountEmailCheckerServiceImpl,
    },
    {
      provide: 'passwordHashProviderService',
      useClass: PasswordHashProviderServiceImpl,
    },
  ],
})
export class PlatformAccessModule {}
