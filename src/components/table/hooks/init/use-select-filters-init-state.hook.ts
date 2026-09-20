'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { assignQueryParamsToSelectFilters } from '../../helpers/filter.helpers';
import { getQueryFromSearchParams } from '../../helpers/url.helpers';
import { TSelectFilter } from '../../types/select-filter.types';

export const useSelectFiltersInitState = (defaultData: TSelectFilter[]) => {
  const searchParams = useSearchParams();
  const query = getQueryFromSearchParams(searchParams);

  const [listOfSelectFilters, setListOfSelectFilters] = useState(
    assignQueryParamsToSelectFilters(defaultData, query),
  );

  return {
    listOfSelectFilters,
    setListOfSelectFilters,
  };
};