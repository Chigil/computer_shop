export const paginate = (page: number, pageSize: number): object => {
  const limit = pageSize;
  const offset = page ? page * pageSize : null;

  return {
    offset,
    limit,
  };
};
