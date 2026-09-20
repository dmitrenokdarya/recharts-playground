'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DEFAULT_OPTIONS_FOR_SHOW_ROWS,
  DEFAULT_SHOW_ROWS_LIMIT,
  FIRST_PAGE,
} from '../../constants/pagination.constants';
import {
  getDefaultCurrentPage,
  getDefaultLimit,
  getSkip,
} from '../../helpers/pagination.helpers';
import { TPaginationConfiguration } from '../../types/pagination.types';
import { TUrlParamWithActionForUpdateHook } from '../../types/url.types';
import { URL_PARAMS_ACTIONS } from '../../constants/custom-url-params.constants';
import { useUpdateUrlParamsWithoutReload } from '../use-update-url-params-without-reload.hooks';

type TUsePaginationConfig = {
  optionsForShowRows?: TPaginationConfiguration['optionsForShowRows'];
  defaultLimit?: number;
};

export const usePaginationInitState = (config?: TUsePaginationConfig) => {
  const searchParams = useSearchParams();
  const { changeUrlParamsWithoutReload } = useUpdateUrlParamsWithoutReload();

  const {
    optionsForShowRows = DEFAULT_OPTIONS_FOR_SHOW_ROWS,
    defaultLimit = DEFAULT_SHOW_ROWS_LIMIT,
  } = config || {};

  const onPage = searchParams.get('onPage');
  const page = searchParams.get('page');

  const [limit, setLimit] = useState(getDefaultLimit(onPage || defaultLimit));
  const skip = useMemo(
    () => getSkip(limit, getDefaultCurrentPage(page)),
    [limit, page],
  );

  const goToFirstPage = (
    queryParamsList: TUrlParamWithActionForUpdateHook[] = [],
  ) => {
    const newUrlParams = [
      ...queryParamsList,
      { name: 'page', value: FIRST_PAGE.toString(), type: URL_PARAMS_ACTIONS.ADD },
    ];

    changeUrlParamsWithoutReload(newUrlParams, true);
  };

  return {
    limit,
    skip,
    onLimitChange: setLimit,
    optionsForShowRows,
    goToFirstPage,
  };
};