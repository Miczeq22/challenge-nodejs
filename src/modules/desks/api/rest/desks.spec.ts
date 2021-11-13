import { Test, TestingModule } from '@nestjs/testing';
import { ReserveDeskCommand } from '../../application/commands/reserve-desk/reserve-desk.command';
import { ReserveDeskCommandHandler } from '../../application/commands/reserve-desk/reserve-desk.command-handler';
import { DesksModule } from '../../desks.module';
import { DesksController } from './desks';

describe('DesksController', () => {
  let desksController: DesksController;
  let reserveDeskHandler: ReserveDeskCommandHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DesksModule],
    }).compile();

    await app.init();

    desksController = app.get<DesksController>(DesksController);
    reserveDeskHandler = app.get<ReserveDeskCommandHandler>(ReserveDeskCommandHandler);
  });

  describe('reserve', () => {
    it('should execute the ReserveDesk command', () => {
      const executeCommandSpy = jest.spyOn(reserveDeskHandler, 'execute');

      desksController.reserve();

      expect(executeCommandSpy).toHaveBeenCalledWith(new ReserveDeskCommand());
    });
  });
});
