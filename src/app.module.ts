import { Module } from '@nestjs/common';
import { DesksModule } from './modules/desks/desks.module';
import { PlatformAccessModule } from './modules/platform-access/platform-access.module';

@Module({
  imports: [DesksModule, PlatformAccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
