import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewAccountRegisteredEvent } from '../../../core/account-registration/events/new-account-registered.event';

@EventsHandler(NewAccountRegisteredEvent)
export class NewAccountRegisteredSubscriber implements IEventHandler<NewAccountRegisteredEvent> {
  constructor(private readonly logger: Logger) {}

  public async handle(event: NewAccountRegisteredEvent) {
    this.logger.log(`Account with email: ${event.emailAddress} registered.`);
  }
}
