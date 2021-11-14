import { Desk } from '../desk/desk.entity';

export interface DeskProviderService {
  findById(id: string): Promise<Desk | null>;
}
