import { Order } from 'sequelize';
import { SortingDto } from '../dto/sorting.dto';

export const sort = (sorting: SortingDto[]): object => {
  let order = {};
  sorting
    ? (order = sorting.map((sort) => [sort.field, sort.sortingOrder]) as Order)
    : (order = null);
  return { order };
};
