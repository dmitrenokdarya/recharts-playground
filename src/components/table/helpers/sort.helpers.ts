import { SORT_DIRECTION } from '../constants/table.constants';
import { TSortParams } from '../types/sort.types';

export const toggleSortType = (
  currentDirection?: TSortParams['direction'],
): TSortParams['direction'] => {
  if (currentDirection === SORT_DIRECTION.ASC) {
    return SORT_DIRECTION.DESC;
  }
  return SORT_DIRECTION.ASC;
};