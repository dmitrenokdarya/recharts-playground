'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { assignQueryParamsToSelectFilters } from '../helpers/filter.helpers';
import { getQueryFromSearchParams } from '../helpers/url.helpers';
import {
  TSelectFilter,
  TSelectFiltersConfiguration,
  TSelectOption,
} from '../types/select-filter.types';
import { URL_PARAMS_ACTIONS } from '../constants/custom-url-params.constants';
import { useUpdateUrlParamsWithoutReload } from './use-update-url-params-without-reload.hooks';

type TUseSelectFilter = {
  setListOfSelectFilters: TSelectFiltersConfiguration['setListOfSelectFilters'];
  paramName: TSelectFilter['paramName'];
  goToFirstPage?: TSelectFiltersConfiguration['goToFirstPage'];
};

export const useSelectFilter = ({
  setListOfSelectFilters,
  paramName,
  goToFirstPage,
}: TUseSelectFilter) => {
  const searchParams = useSearchParams();
  const query = useMemo(() => getQueryFromSearchParams(searchParams), [searchParams]);

  const { addUrlParamsWithoutReload, removeUrlParamsWithoutReload } =
    useUpdateUrlParamsWithoutReload();

  useEffect(() => {
    setListOfSelectFilters((prevValue) =>
      assignQueryParamsToSelectFilters(prevValue, query),
    );
  }, [query?.[paramName]]);

  const updateParamInUrl = (newValue: TSelectOption[] | []) => {
    const paramValue = newValue.flatMap((item) =>
      Array.isArray(item.value) ? item.value.toString() : [item.value.toString()],
    );
    const isEmpty = !paramValue.length;

    if (isEmpty) {
      if (goToFirstPage) {
        goToFirstPage([
          { name: paramName, value: paramValue, type: URL_PARAMS_ACTIONS.DELETE },
        ]);
      } else {
        removeUrlParamsWithoutReload([paramName]);
      }
      return;
    }

    if (goToFirstPage) {
      goToFirstPage([
        { name: paramName, value: paramValue, type: URL_PARAMS_ACTIONS.ADD },
      ]);
    } else {
      addUrlParamsWithoutReload([{ name: paramName, value: paramValue }]);
    }
  };

  const handleChange = (newValue: TSelectOption) => {
    const newValueArray = Array.isArray(newValue) ? newValue : [newValue];
    updateParamInUrl(newValueArray);
  };

  return {
    handleChange,
  };
};