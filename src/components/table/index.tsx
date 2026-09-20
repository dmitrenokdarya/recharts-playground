import { Children, ReactNode, memo } from 'react';
import clsx from 'clsx';

import TableHeader from './components/TableHeader';
import TableNotFoundBlock from './components/TableNotFoundBlock';
import TablePagination from './components/TablePagination';
import TableToolbar from './components/TableToolbar';

import { TPaginationConfiguration } from './types/pagination.types';
import { TSearchConfiguration } from './types/search.types';
import { TSelectFiltersConfiguration } from './types/select-filter.types';
import { TSortConfiguration } from './types/sort.types';
import { THeaderCell } from './types/table.types';

type Props = {
  className?: string;
  headerCells?: THeaderCell[];
  tableRows: ReactNode;
  sortConfiguration?: TSortConfiguration;
  paginationConfiguration?: TPaginationConfiguration;
  isLoading?: boolean;
  totalItemCount: number;
  dataNotFoundBlock?: ReactNode;
  scrollable?: boolean;
  searchConfiguration?: TSearchConfiguration;
  selectFiltersConfiguration?: TSelectFiltersConfiguration;
  tableInfo?: string;
  headerClassName?: string;
  tableToolbarClassName?: string;
  hasResetButton?: boolean;
};

const Table = ({
  className,
  headerCells,
  tableRows,
  sortConfiguration,
  isLoading,
  dataNotFoundBlock,
  totalItemCount,
  paginationConfiguration,
  selectFiltersConfiguration,
  searchConfiguration,
  tableToolbarClassName,
  tableInfo,
  scrollable = true,
  headerClassName,
  hasResetButton = false,
}: Props) => {
  const isShowPagination = !!totalItemCount && paginationConfiguration;

  return (
    <>
        <TableToolbar
          searchConfiguration={searchConfiguration}
          selectFiltersConfiguration={selectFiltersConfiguration}
          className={tableToolbarClassName}
          hasResetButton={hasResetButton}
        />

      <div className={clsx(className, scrollable && 'overflow-x-auto')}>
        <table
          className={clsx(
            'bg-default w-full border-none border-spacing-0 rounded-none border-separate overflow-hidden mt-2',
            'table',
          )}
        >
          {headerCells && (
            <TableHeader
              headerCells={headerCells}
              totalItemCount={totalItemCount}
              headerClassName={headerClassName}
              {...sortConfiguration}
            />
          )}
          <tbody>
            {!isLoading && !totalItemCount
              ? dataNotFoundBlock || <TableNotFoundBlock />
              : null}
            {!isLoading && !!totalItemCount ? Children.toArray(tableRows) : null}
          </tbody>
        </table>
      </div>
      {isShowPagination && (
        <TablePagination
          totalItemCount={totalItemCount}
          tableInfo={tableInfo}
          {...paginationConfiguration}
        />
      )}
    </>
  );
};

export default memo(Table);