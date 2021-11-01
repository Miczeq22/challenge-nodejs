import { Test, TestingModule } from '@nestjs/testing';
import { ReserveDeskHandler } from '../../../application/command/reserve-desk.handler';
import { DesksModule } from '../../../desks.module';
import { ReserveDeskCommand } from '../../../domain/command/reserve-desk';
import { DesksController } from './desks';

describe('DesksController', () => {
  let desksController: DesksController;
  let reserveDeskHandler: ReserveDeskHandler;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DesksModule],
    }).compile();

    await app.init();

    desksController = app.get<DesksController>(DesksController);
    reserveDeskHandler = app.get<ReserveDeskHandler>(ReserveDeskHandler);
  });

  describe('reserve', () => {
    it('should execute the ReserveDesk command', () => {
      const executeCommandSpy = jest.spyOn(reserveDeskHandler, 'execute');

      desksController.reserve();

      expect(executeCommandSpy).toHaveBeenCalledWith(new ReserveDeskCommand());
    });
  });
});
