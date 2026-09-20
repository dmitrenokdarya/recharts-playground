'use client';

import { URL_PARAMS_ACTIONS } from '../constants/custom-url-params.constants';
import { TUrlParamsForUpdateHook, TUrlParamWithActionForUpdateHook } from '../types/url.types';

const appendUniqueValue = (params: URLSearchParams, key: TUrlParamsForUpdateHook['name'], value: TUrlParamsForUpdateHook['name']) => {
  const values = params.getAll(key);

  if (!values.includes(value)) {
    params.append(key, value);
  }
};

const handleUrlParamValue = (currentParams: URLSearchParams, item: TUrlParamsForUpdateHook) => {
  if (Array.isArray(item.value)) {
    currentParams.delete(item.name);
    item.value.forEach((value) => appendUniqueValue(currentParams, item.name, value));
  } else {
    currentParams.set(item.name, item.value);
  }
};

const getCurrentParams = () => new URLSearchParams(window.location.search);

const pushUrlParams = (params: URLSearchParams, isNotScrollToTop?: boolean) => {
  window.history.pushState(null, '', `?${params.toString()}`);

  if (!isNotScrollToTop) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};

export const useUpdateUrlParamsWithoutReload = () => {
  const addUrlParamsWithoutReload = (urlParams: TUrlParamsForUpdateHook[], isNotScrollToTop?: boolean) => {
    const currentParams = getCurrentParams();
    urlParams?.forEach((item) => handleUrlParamValue(currentParams, item));
    pushUrlParams(currentParams, isNotScrollToTop);
  };

  const removeUrlParamsWithoutReload = (urlParams: string[], isNotScrollToTop?: boolean) => {
    const currentParams = getCurrentParams();
    urlParams?.forEach((item) => currentParams.delete(item));
    pushUrlParams(currentParams, isNotScrollToTop);
  };

  const changeUrlParamsWithoutReload = (
    urlParams: TUrlParamWithActionForUpdateHook[],
    isNotScrollToTop?: boolean,
  ) => {
    const currentParams = getCurrentParams();

    urlParams?.forEach((item) => {
      if (item.type === URL_PARAMS_ACTIONS.ADD) {
        handleUrlParamValue(currentParams, item);
      }

      if (item.type === URL_PARAMS_ACTIONS.DELETE) {
        currentParams.delete(item.name);
      }
    });

    pushUrlParams(currentParams, isNotScrollToTop);
  };

  return {
    addUrlParamsWithoutReload,
    removeUrlParamsWithoutReload,
    changeUrlParamsWithoutReload,
  };
};
