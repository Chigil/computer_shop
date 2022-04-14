import { Order } from 'sequelize';
import { SortingDto } from '../dto/sorting.dto';

export const sort = (sorting: SortingDto[]) => {
  return sorting
    ? (sorting.map((sort) => [sort.field, sort.sortingOrder]) as Order)
    : null;
};
