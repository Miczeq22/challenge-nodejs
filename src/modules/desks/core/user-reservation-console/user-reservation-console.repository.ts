import { UserReservationConsole } from './user-reservation-console.aggregate-root';

export interface UserReservationConsoleRepository {
  findByUserId(userId: string): Promise<UserReservationConsole | null>;
}
