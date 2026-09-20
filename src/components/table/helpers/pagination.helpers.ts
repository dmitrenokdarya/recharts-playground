import { FIRST_PAGE } from '../constants/pagination.constants';

export const getTotalPages = (totalItemCount: number, limit: number): number => {
  if (!limit || limit <= 0) return 0;
  return Math.ceil(totalItemCount / limit);
};

export const getCurrentPage = (skip: number, limit: number): number => {
  if (!limit || limit <= 0) return FIRST_PAGE;
  return Math.floor(skip / limit) + 1;
};

export const getSkip = (limit: number, page: number): number => {
  const currentPage = page < FIRST_PAGE ? FIRST_PAGE : page;
  return (currentPage - 1) * limit;
};

export const getDefaultLimit = (onPageParam: string | number | null): number => {
  return Number(onPageParam) || 10;
};

export const getDefaultCurrentPage = (pageParam: string | number | null): number => {
  return Number(pageParam) || FIRST_PAGE;
};