export function toSnakeCase(data: object): object {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key.replace(/([A-Z])/g, '_$1').toLowerCase(), value]),
  );
}