'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FIRST_PAGE } from '../constants/pagination.constants';
import { getCurrentPage, getTotalPages } from '../helpers/pagination.helpers';
import { TOptionsForShowRows } from '../types/pagination.types';
import { useUpdateUrlParamsWithoutReload } from './use-update-url-params-without-reload.hooks';

type TUsePagination = {
  totalItemCount: number;
  itemsPerPageFromState: number;
  updateItemsPerPageFromState: (itemsPerPage: number) => void;
  skip: number;
  isActive?: boolean;
};

export const usePagination = (options: TUsePagination) => {
  const {
    totalItemCount,
    itemsPerPageFromState,
    updateItemsPerPageFromState,
    skip,
    isActive = true,
  } = options;

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { addUrlParamsWithoutReload } = useUpdateUrlParamsWithoutReload();

  const currentPageFromUrl = searchParams.get('page');
  const itemsPerPageFromUrl = searchParams.get('onPage');

  const totalPages = useMemo(
    () => getTotalPages(totalItemCount, itemsPerPageFromState),
    [totalItemCount, itemsPerPageFromUrl, itemsPerPageFromState],
  );

  const currentPage = useMemo(
    () => Number(currentPageFromUrl) || getCurrentPage(skip, itemsPerPageFromState),
    [currentPageFromUrl, skip, itemsPerPageFromState],
  );

  const updateUrlParams = useCallback(
    (page: number, onPage?: number | string) => {
      const urlParams = [];

      if (page) {
        urlParams.push({ name: 'page', value: page.toString() });
      }

      if (onPage) {
        urlParams.push({ name: 'onPage', value: onPage.toString() });
      }

      addUrlParamsWithoutReload(urlParams, true);
    },
    [pathname, router, searchParams, addUrlParamsWithoutReload],
  );

  const handleChangeSelect = useCallback(
    (newData: TOptionsForShowRows) => {
      const newValue = newData.value;
      updateUrlParams(FIRST_PAGE, newValue);
      updateItemsPerPageFromState(Number(newValue));
    },
    [updateUrlParams, updateItemsPerPageFromState],
  );

  const goToPage = ({ selected }: { selected: number }) => {
    updateUrlParams(selected + 1);
  };

  const redirectIfPageEmpty = () => {
    if (!isActive || totalPages <= 0) {
      return;
    }

    if (currentPage > totalPages) {
      goToPage({ selected: totalPages - 1 });
    }
  };

  useEffect(() => redirectIfPageEmpty(), [currentPage, totalPages, isActive]);

  return {
    totalPages,
    currentPage,
    handleChangeSelect,
    goToPage,
  };
};