import { memo } from 'react';
import { usePagination } from '../../hooks/use-pagination.hook';
import { TPaginationConfiguration } from '../../types/pagination.types';
import ItemsPerPageBlock from './ItemsPerPageBlock';
import Pagination from '../Pagination';

type Props = TPaginationConfiguration & {
  totalItemCount: number;
  tableInfo?: string;
};

const TablePagination = ({
  limit,
  skip,
  totalItemCount,
  optionsForShowRows,
  onLimitChange,
  isShowSelectItemsPerPage = true,
  tableInfo,
  isActive = true,
}: Props) => {
  const { totalPages, currentPage, goToPage, handleChangeSelect } =
    usePagination({
      totalItemCount,
      skip,
      itemsPerPageFromState: limit,
      updateItemsPerPageFromState: onLimitChange,
      isActive,
    });

  const minLimitValue =
    isShowSelectItemsPerPage === false
      ? Number(limit) || 0
      : Number(optionsForShowRows?.[0]?.value) || 0;

  const isShowRightBlock =
    totalItemCount > minLimitValue && isShowSelectItemsPerPage;
  const isShowPagination = totalPages > 1;

  if (!isShowPagination && !isShowRightBlock && !tableInfo) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 pt-1 max-md:flex-col max-md:items-stretch">
      <div className="min-w-0 shrink-0">
        {tableInfo && (
          <p className="text-body-mono-xs text-secondary tracking-wide uppercase">
            {tableInfo}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-4 max-md:justify-between max-md:w-full">
        {isShowPagination && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={goToPage}
            hasTableInfo={!!tableInfo}
          />
        )}
        {isShowRightBlock && (
          <ItemsPerPageBlock
            optionsForShowRows={optionsForShowRows}
            limit={limit}
            handleChangeSelect={handleChangeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default memo(TablePagination);
