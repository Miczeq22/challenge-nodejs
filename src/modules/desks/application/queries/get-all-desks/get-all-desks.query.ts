import { PaginatedRequest } from '../../../../../tools/pagination';

export class GetAllDesksQuery {
  constructor(public readonly pagination: PaginatedRequest) {}
}
