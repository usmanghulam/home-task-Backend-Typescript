

export const parseDate = (date: string): Date => {
  const value = new Date(date);
  if (isNaN(value.getTime())) {
    throw new Error(`Invalid date format: ${date}`);
  }

  return value;
};