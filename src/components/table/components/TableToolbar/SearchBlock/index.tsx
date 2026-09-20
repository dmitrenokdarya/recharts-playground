'use client';

import { memo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchIcon, X } from 'lucide-react';
import { useSearch } from '../../../hooks/use-search.hook';
import { TSearchConfiguration } from '../../../types/search.types';
import Input from '../../ui/Input';

type Props = TSearchConfiguration;

const SearchBlock = ({
  setInputSearchValue,
  goToFirstPage,
  inputProps,
}: Props) => {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get('search');

  const { handleSearch, resetSearch } = useSearch(
    setInputSearchValue,
    goToFirstPage,
  );

  return (
    <div className="w-80">
      <Input
        name="search"
        className="p-2.5 text-body-mono-m bg-default"
        autoComplete="off"
        value={searchFromUrl?.toString() || ''}
        onChange={(e) => handleSearch(e.target.value)}
        leftContent={<SearchIcon size={16} color="var(--text-secondary)" />}
        rightContent={
          searchFromUrl ? (
            <button type="button" onClick={resetSearch}>
              <X size={16} color="var(--text-secondary)" />
            </button>
          ) : null
        }
        {...inputProps}
      />
    </div>
  );
};

export default memo(SearchBlock);
