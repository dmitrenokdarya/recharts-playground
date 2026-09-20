import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TUrlParamWithActionForUpdateHook } from './url.types';

export type TSelectOption = {
  value: string | number;
  label: string;
};

export type TSelectFilter = {
  paramName: string;
  selectProps?: {
    listOfOptions?: TSelectOption[];
    [key: string]: unknown;
  };
  leftLabel?: string;
  customComponent?: ReactNode;
};

export type TSelectFiltersConfiguration = {
  listOfSelectFilters: TSelectFilter[];
  setListOfSelectFilters: Dispatch<SetStateAction<TSelectFilter[]>>;
  goToFirstPage?: (urlParams?: TUrlParamWithActionForUpdateHook[]) => void;
};