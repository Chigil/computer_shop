import { Op } from 'sequelize';

export const search = (filter) => {
  if (filter.field) {
    return { [filter.field]: { [Op.iLike]: `%${filter.value}%` } };
  }
  return null;
};
