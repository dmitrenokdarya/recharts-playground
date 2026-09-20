'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TSearchConfiguration } from '../../types/search.types';

type TUseInitSearchState = {
  inputProps?: TSearchConfiguration['inputProps'];
};

export const useInitSearchState = ({ inputProps }: TUseInitSearchState = {}) => {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get('search');

  const [searchInputValue, setInputSearchValue] = useState(
    searchFromUrl?.toString() || undefined,
  );

  return {
    searchInputValue,
    setInputSearchValue,
    inputProps,
  };
};