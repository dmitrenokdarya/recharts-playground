import { memo } from 'react';
import clsx from 'clsx';
import { SORT_DIRECTION } from '../../constants/table.constants';
import { useSort } from '../../hooks/use-sort.hook';

import { TSetSortParams, TSortParams } from '../../types/sort.types';
import { THeaderCell } from '../../types/table.types';
import SortArrowIcons from './SortArrowIcons';
import { Info } from 'lucide-react';
import CustomTooltip from '../ui/CustomTooltip';

type Props = {
  headerCells: THeaderCell[];
  sortParams?: TSortParams;
  setSortParams?: TSetSortParams;
  totalItemCount?: number;
  headerClassName?: string;
};

const TableHeader = ({
  headerCells,
  sortParams,
  setSortParams,
  totalItemCount,
  headerClassName,
}: Props) => {
  const handleSort = useSort(sortParams, setSortParams);
  const hasItemsToSort = Number(totalItemCount) > 0;

  const handleClick = (headerCellItem: THeaderCell) => {
    if (sortParams && headerCellItem.sortBy && hasItemsToSort) {
      handleSort(headerCellItem.sortBy, headerCellItem?.initialSortDirection);
    }

    if (headerCellItem?.onClick) {
      headerCellItem.onClick();
    }
  };

  return (
    <thead>
      <tr className="tableHeader">
        {headerCells.map((headerCellItem, index) => (
          <th
            key={index}
            onClick={() => index !== 0 && handleClick(headerCellItem)}
            className={clsx(
              'border-b border-stroke first:pl-5',
              headerCellItem.isRightAlign ? 'text-right' : 'text-left',
              headerCellItem.sortBy && index !== 0
                ? 'cursor-pointer'
                : 'cursor-default',
              headerClassName,
            )}
            role={headerCellItem.sortBy && index !== 0 ? 'button' : 'cell'}
          >
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'header-cell !gap-1 flex-1',
                  headerCellItem.isRightAlign && 'right-aligned',
                  headerCellItem.class,
                )}
              >
                <div className="flex gap-1">
                  {!headerCellItem.isTooltipRight &&
                    headerCellItem.tooltipText && (
                      <div className="mt-[3px]">
                        <CustomTooltip content={headerCellItem.tooltipText}>
                          <Info size={10} className="text-light-gray" />
                        </CustomTooltip>
                      </div>
                    )}
                  <span className="whitespace-nowrap text-movr-m text-secondary">
                    {headerCellItem.text}
                    {headerCellItem.content}
                  </span>
                  {headerCellItem.isTooltipRight &&
                    headerCellItem.tooltipText && (
                      <div className="mt-[3px]">
                        <CustomTooltip
                          content={headerCellItem.tooltipText}
                          className="max-w-[293px] !bg-[var(--brand-primary)] text-white"
                        >
                          <Info size={10} className="text-light-gray" />
                        </CustomTooltip>
                      </div>
                    )}
                </div>

                {headerCellItem.sortBy && hasItemsToSort && (
                  <SortArrowIcons
                    isSortActive={headerCellItem.sortBy === sortParams?.by}
                    isSortDesc={sortParams?.direction === SORT_DIRECTION.DESC}
                  />
                )}
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
