import { Dispatch, SetStateAction } from 'react';
import { SORT_DIRECTION } from '../constants/table.constants';

export type TSortParams = {
  direction?: SORT_DIRECTION;
  by?: string;
};

export type TSetSortParams = Dispatch<SetStateAction<TSortParams>>;

export type TSortConfiguration = {
  sortParams: TSortParams;
  setSortParams: TSetSortParams;
};