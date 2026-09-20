'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TSortParams } from '../../types/sort.types';

export const useSortInitState = (defaultSortParams?: TSortParams) => {
  const searchParams = useSearchParams();
  const sortDirectionFromUrl = searchParams.get('sortDirection');
  const sortByFromUrl = searchParams.get('sortBy');

  const [sortParams, setSortParams] = useState<TSortParams>({
    by: (sortByFromUrl || defaultSortParams?.by) as TSortParams['by'],
    direction: (sortDirectionFromUrl ||
      defaultSortParams?.direction) as TSortParams['direction'],
  });

  return {
    sortParams,
    setSortParams,
  };
};