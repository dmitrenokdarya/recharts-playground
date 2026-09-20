'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TSearchConfiguration } from '../types/search.types';
import { URL_PARAMS_ACTIONS } from '../constants/custom-url-params.constants';
import { useUpdateUrlParamsWithoutReload } from './use-update-url-params-without-reload.hooks';

export const useSearch = (
  setValueFromState: TSearchConfiguration['setInputSearchValue'],
  goToFirstPage: TSearchConfiguration['goToFirstPage'],
) => {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get('search');
  const { addUrlParamsWithoutReload, removeUrlParamsWithoutReload } =
    useUpdateUrlParamsWithoutReload();

  const removeSearchParamInUrl = () => {
    if (goToFirstPage) {
      const urlParams = [
        { name: 'search', value: '', type: URL_PARAMS_ACTIONS.DELETE },
      ];
      goToFirstPage(urlParams);
    } else {
      removeUrlParamsWithoutReload(['search']);
    }
  };

  const updateSearchParamInUrl = (newSearchValue: string) => {
    if (goToFirstPage) {
      goToFirstPage([
        { name: 'search', value: newSearchValue, type: URL_PARAMS_ACTIONS.ADD },
      ]);
    } else {
      addUrlParamsWithoutReload([{ name: 'search', value: newSearchValue }]);
    }
  };

  const handleSearch = (inputValue?: string) => {
    if (inputValue) {
      updateSearchParamInUrl(inputValue);
    } else {
      removeSearchParamInUrl();
    }
  };

  useEffect(() => {
    if (searchFromUrl) {
      setValueFromState(searchFromUrl);
    } else {
      setValueFromState(undefined);
    }
  }, [searchFromUrl, setValueFromState]);

  return {
    handleSearch,
    resetSearch: removeSearchParamInUrl,
  };
};