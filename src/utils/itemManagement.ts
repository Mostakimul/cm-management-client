export type TFilterData = { value: string; label: string };

const getFiltersArray = (items: string[] = []): TFilterData[] => {
  const filterMap = new Map<string, TFilterData>();

  items.forEach((item: string) => {
    const value = item;
    if (value) {
      filterMap.set(value, { value, label: value });
    }
  });

  return Array.from(filterMap.values());
};

export default {
  getFiltersArray,
};
