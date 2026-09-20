'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SORT_DIRECTION } from '../constants/table.constants';
import { toggleSortType } from '../helpers/sort.helpers';
import { TSetSortParams, TSortParams } from '../types/sort.types';
import { useUpdateUrlParamsWithoutReload } from './use-update-url-params-without-reload.hooks';

type TReturn = (
  nextSortBy: TSortParams['by'],
  initialSortDirection?: TSortParams['direction'],
) => void;

export const useSort = (
  sortParamsFromState?: TSortParams,
  updateSortParamsFromState?: TSetSortParams,
): TReturn => {
  const searchParams = useSearchParams();
  const { addUrlParamsWithoutReload } = useUpdateUrlParamsWithoutReload();

  const sortDirectionFromUrl = searchParams.get('sortDirection');
  const sortByFromUrl = searchParams.get('sortBy');

  const { by: sortByFromState, direction: sortDirectionFromState } =
    sortParamsFromState || {};

  useEffect(() => {
    if (sortDirectionFromUrl && sortByFromUrl && updateSortParamsFromState) {
      updateSortParamsFromState({
        direction: sortDirectionFromUrl.toString() as TSortParams['direction'],
        by: sortByFromUrl.toString(),
      });
    }
  }, [sortDirectionFromUrl, sortByFromUrl, updateSortParamsFromState]);

  const updateSortParamsInUrl = (
    nextSortDirection: TSortParams['direction'],
    nextSortBy: TSortParams['by'],
  ) => {
    const urlParams = [];

    if (nextSortDirection) {
      urlParams.push({ name: 'sortDirection', value: nextSortDirection });
    }

    if (nextSortBy) {
      urlParams.push({ name: 'sortBy', value: nextSortBy });
    }

    addUrlParamsWithoutReload(urlParams, true);
  };

  const getNextSortDirection = (
    nextSortBy: TSortParams['by'],
    initialSortDirection: TSortParams['direction'] = SORT_DIRECTION.ASC,
  ) => {
    return sortByFromState === nextSortBy && sortDirectionFromState
      ? toggleSortType(sortDirectionFromState)
      : initialSortDirection;
  };

  const handleSort = (
    nextSortBy: TSortParams['by'],
    initialSortDirection?: TSortParams['direction'],
  ) => {
    const nextSortDirection = getNextSortDirection(nextSortBy, initialSortDirection);
    updateSortParamsInUrl(nextSortDirection, nextSortBy);
  };

  return handleSort;
};