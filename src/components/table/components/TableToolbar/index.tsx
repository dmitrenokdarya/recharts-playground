import { memo } from 'react';
import { TSearchConfiguration } from '../../types/search.types';
import { TSelectFiltersConfiguration } from '../../types/select-filter.types';
import SearchBlock from './SearchBlock';
import SelectFilterList from './SelectFilterList';
import { clsx } from 'clsx';

type Props = {
  selectFiltersConfiguration?: TSelectFiltersConfiguration;
  searchConfiguration?: TSearchConfiguration;
  className?: string;
  hasResetButton?: boolean;
};

const TableToolbar = ({
  searchConfiguration,
  selectFiltersConfiguration,
  hasResetButton,
  className,
}: Props) => {
  const { listOfSelectFilters } = selectFiltersConfiguration || {};
  const isShowFiltersWrapper = listOfSelectFilters?.length;

  if (!searchConfiguration && !isShowFiltersWrapper) return null;

  return (
    <div
      className={clsx(
        'mt-4 flex items-center justify-between gap-5 overflow-x-auto whitespace-nowrap',
        className,
      )}
    >
      {searchConfiguration && <SearchBlock {...searchConfiguration} />}
      {selectFiltersConfiguration && (
        <SelectFilterList
          selectFiltersConfiguration={selectFiltersConfiguration}
          hasResetButton={hasResetButton}
        />
      )}
    </div>
  );
};

export default memo(TableToolbar);
