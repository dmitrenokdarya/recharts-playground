import { Dispatch, SetStateAction } from 'react';

export type TOptionsForShowRows = {
  value: number;
  label: string;
};

export type TPaginationConfiguration = {
  limit: number;
  onLimitChange: Dispatch<SetStateAction<number>>;
  skip: number;
  goToFirstPage: () => void;
  optionsForShowRows: TOptionsForShowRows[];
  isShowSelectItemsPerPage?: boolean;
  isActive?: boolean;
};