import { TOptionsForShowRows } from '../types/pagination.types';

export const FIRST_PAGE = 1;
export const DEFAULT_SHOW_ROWS_LIMIT = 10;

export const DEFAULT_OPTIONS_FOR_SHOW_ROWS: TOptionsForShowRows[] = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
];