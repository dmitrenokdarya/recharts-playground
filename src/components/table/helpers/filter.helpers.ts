import { TSelectFilter } from '../types/select-filter.types';
import { QueryParams } from '../types/url.types';

export const assignQueryParamsToSelectFilters = (
  filters: TSelectFilter[],
  query: QueryParams,
): TSelectFilter[] => {
  return filters.map((filter) => {
    const paramValue = query[filter.paramName];
    if (!paramValue) return filter;

    return {
      ...filter,
      value: paramValue,
    };
  });
};