import { ReadonlyURLSearchParams } from 'next/navigation';
import { QueryParams } from '../types/url.types';

export const getQueryFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
): QueryParams => {
  const query: QueryParams = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};