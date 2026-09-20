import { Dispatch, SetStateAction } from 'react';
import { TUrlParamWithActionForUpdateHook } from './url.types';
import { InputProps } from '../components/ui/Input';

export type TSearchConfiguration = {
  searchInputValue?: string;
  setInputSearchValue: Dispatch<SetStateAction<string | undefined>>;
  goToFirstPage?: (urlParams?: TUrlParamWithActionForUpdateHook[]) => void;
  inputProps?: InputProps;
};