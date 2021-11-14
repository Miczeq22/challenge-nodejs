import { IsInt } from 'class-validator';

export interface PaginatedResponse<T> {
  total: number;
  items: T[];
}

export class PaginatedRequest {
  @IsInt()
  start?: number;
  @IsInt()
  limit?: number;
}

export const DEFAULT_LIMIT = 20;
