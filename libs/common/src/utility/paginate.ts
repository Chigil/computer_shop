import { PaginationDto } from '../dto/pagination.dto';

export const paginate = (
  pagination: PaginationDto,
): { offset: number; limit: number } => {
  const limit = pagination?.page || 10;
  const offset = pagination?.page ? pagination?.page * pagination?.size : null;

  return {
    offset,
    limit,
  };
};
