import { add } from 'date-fns';
import { createMockProxy } from '../../../../tools/mock-proxy';
import { DeskProviderService } from '../desk-provider/desk-provider.service';
import { Desk } from '../desk/desk.entity';
import { ReservationStatusValue } from '../reservation-status/reservation-status.value-object';
import { DeskHasBeenReservedEvent } from './events/desk-has-been-reserved.event';
import { DeskReservationHasBeenCanceledEvent } from './events/desk-reservation-has-been-canceled.event';
import { UserReservationConsole } from './user-reservation-console.aggregate-root';

const mockDeskData = {
  currentReservations: [],
  id: '#desk-id',
};

describe('[DOMAIN] User Reservation Console', () => {
  const deskProviderService = createMockProxy<DeskProviderService>();

  beforeEach(() => {
    deskProviderService.mockClear();
  });

  test('should throw an error if user has already active reservation', async () => {
    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [
        {
          deskId: '#desk-id',
          id: '#reservation-id',
        },
      ],
    });

    await expect(() =>
      userReservationConsole.startReservationProcess(
        {
          deskId: '#desk-id',
          startDate: new Date().toISOString(),
          endDate: add(new Date(), { days: 5 }).toISOString(),
        },
        deskProviderService,
      ),
    ).rejects.toThrowError(
      "Can't reserve desk. You can have only one active desk reservation at a time.",
    );
  });

  test('should throw an error if desk with provided id does not exist', async () => {
    deskProviderService.findById.mockResolvedValue(null);

    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    await expect(() =>
      userReservationConsole.startReservationProcess(
        {
          deskId: '#desk-id',
          startDate: new Date().toISOString(),
          endDate: add(new Date(), { days: 5 }).toISOString(),
        },
        deskProviderService,
      ),
    ).rejects.toThrowError('Selected desk does not exist.');
  });

  test('should throw an error if start date is not at least tomorrow', async () => {
    deskProviderService.findById.mockResolvedValue(Desk.fromPersistence(mockDeskData));

    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    await expect(() =>
      userReservationConsole.startReservationProcess(
        {
          deskId: '#desk-id',
          startDate: new Date().toISOString(),
          endDate: add(new Date(), { days: 5 }).toISOString(),
        },
        deskProviderService,
      ),
    ).rejects.toThrowError('Desk must be reserved with at least one day notice.');
  });

  test('should throw an error if desk is not reserved for at least one day', async () => {
    deskProviderService.findById.mockResolvedValue(Desk.fromPersistence(mockDeskData));

    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    await expect(() =>
      userReservationConsole.startReservationProcess(
        {
          deskId: '#desk-id',
          startDate: add(new Date(), { days: 1 }).toISOString(),
          endDate: add(new Date(), { days: 1 }).toISOString(),
        },
        deskProviderService,
      ),
    ).rejects.toThrowError("Can't reserve desk. Desk must be reserved for at least one day.");
  });

  test('should throw an error if desk is already reserved for provided period', async () => {
    deskProviderService.findById.mockResolvedValue(
      Desk.fromPersistence({
        ...mockDeskData,
        currentReservations: [
          {
            id: '#reservation-id',
            startDate: new Date().toISOString(),
            endDate: add(new Date(), { days: 3 }).toISOString(),
            status: ReservationStatusValue.Confirmed,
          },
        ],
      }),
    );

    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    await expect(() =>
      userReservationConsole.startReservationProcess(
        {
          deskId: '#desk-id',
          startDate: add(new Date(), { days: 1 }).toISOString(),
          endDate: add(new Date(), { days: 5 }).toISOString(),
        },
        deskProviderService,
      ),
    ).rejects.toThrowError(
      'This period for selected desk is already taken. Please select different date for reservation.',
    );
  });

  test('should reserve desk and propagate correct event', async () => {
    deskProviderService.findById.mockResolvedValue(Desk.fromPersistence(mockDeskData));

    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    await userReservationConsole.startReservationProcess(
      {
        deskId: '#desk-id',
        startDate: add(new Date(), { days: 1 }).toISOString(),
        endDate: add(new Date(), { days: 5 }).toISOString(),
      },
      deskProviderService,
    );

    expect(
      userReservationConsole.getUncommittedEvents()[0] instanceof DeskHasBeenReservedEvent,
    ).toBeTruthy();
  });

  test('should throw an error if desk is not reserved by user on reservation cancel', async () => {
    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [],
    });

    expect(() => userReservationConsole.cancelReservation('#reservation-id')).toThrowError(
      "Can't cancel desk reservation. Selected desk is not currently reserved by you.",
    );
  });

  test('should cancel desk reservation and propagate correct event', async () => {
    const userReservationConsole = UserReservationConsole.fromPersistence({
      id: '#id',
      currentlyReservedDesks: [
        {
          deskId: '#desk-id',
          id: '#reservation-id',
        },
      ],
    });

    userReservationConsole.cancelReservation('#reservation-id');

    expect(
      userReservationConsole.getUncommittedEvents()[0] instanceof
        DeskReservationHasBeenCanceledEvent,
    ).toBeTruthy();
  });
});
