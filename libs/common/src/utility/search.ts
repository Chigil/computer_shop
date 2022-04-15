import { FilterDto } from '../dto/filter.dto';
import { Op } from 'sequelize';

export const search = (filter: FilterDto) => {
  if (filter?.field) {
    return { [filter.field]: { [Op.iLike]: `%${filter.value}%` } };
  }
  return null;
};
