import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { postgresQueryBuilder } from '../../infrastructure/database/query-builder';
import { AccountEmailCheckerServiceImpl } from '../shared-kernel/core/infrastructure/account-email-checker/account-email-checker.service';
import { PasswordHashProviderServiceImpl } from '../shared-kernel/core/infrastructure/password-hash-provider/password-hash-provider.service';
import { PlatformAccessController } from './api/rest/platform-access.controller';
import { LoginCommandHandler } from './application/commands/login/login.command-handler';
import { RegisterNewAccountCommandHandler } from './application/commands/register-new-account/register-new-account.command-handler';
import { NewAccountRegisteredSubscriber } from './application/subscribers/new-account-registered/new-account-registered.subscriber';
import { UserLoggedInSubscriber } from './application/subscribers/user-logged-in/user-logged-in.subscriber';
import { AccountRegistrationRepositoryImpl } from './infrastructure/account-registration/account-registration.repository';
import { AccountRepositoryImpl } from './infrastructure/account/account.repository';
import { JwtStrategy } from './infrastructure/jwt-strategy/jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [PlatformAccessController],
  providers: [
    JwtStrategy,
    RegisterNewAccountCommandHandler,
    NewAccountRegisteredSubscriber,
    LoginCommandHandler,
    Logger,
    UserLoggedInSubscriber,
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
    {
      provide: 'accountRepository',
      useClass: AccountRepositoryImpl,
    },
  ],
})
export class PlatformAccessModule {}
