/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSSE } from '@/hook/useSSE';
import { WikiChange } from './types';
import { usePaginationInitState } from '../table/hooks/init/use-pagination-init-state.hook';
import { useInitSearchState } from '../table/hooks/init/use-init-search-state.hook';
import { useSelectFiltersInitState } from '../table/hooks/init/use-select-filters-init-state.hook';
import { INITIAL_SELECT_FILTERS, TABLE_HEADER_CELLS, WIKI_SSE_URL } from './constants';
import { useSortInitState } from '../table/hooks/init/use-sort-init-state.hook';
import WikiChangesControlPanel from './WikiChangesControlPanel';
import WikiTableRow from './TableRow';
import Table from '../table';


const WikiChangesModule = () => {
  const [changes, setChanges] = useState<WikiChange[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { limit, skip, onLimitChange, optionsForShowRows, goToFirstPage } =
    usePaginationInitState({ defaultLimit: 10 });

  const { searchInputValue, setInputSearchValue } = useInitSearchState();

  const { listOfSelectFilters, setListOfSelectFilters } =
    useSelectFiltersInitState(INITIAL_SELECT_FILTERS);

  const { sortParams, setSortParams } = useSortInitState({
    by: 'timestamp',
    direction: 'DESC' as any,
  });

  const handleMessage = useCallback((data: WikiChange) => {
    setChanges((prevChanges) => [data, ...prevChanges].slice(0, 100));
  }, []);

  const { status } = useSSE<WikiChange>({
    url: WIKI_SSE_URL,
    onMessage: handleMessage,
    enabled: isConnected,
  });

  const selectedWikiParam = useMemo(() => {
    const wikiFilter = listOfSelectFilters.find((f) => f.paramName === 'wiki');
    return (wikiFilter as any)?.value || 'all';
  }, [listOfSelectFilters]);

  const filteredChanges = useMemo(() => {
    return changes.filter((item) => {
      const matchWiki =
        selectedWikiParam === 'all' || item.wiki === selectedWikiParam;

      const searchTerm = searchInputValue?.toLowerCase() || '';
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.user.toLowerCase().includes(searchTerm);

      return matchWiki && matchSearch;
    });
  }, [changes, selectedWikiParam, searchInputValue]);

  const paginatedChanges = useMemo(() => {
    return filteredChanges.slice(skip, skip + limit);
  }, [filteredChanges, skip, limit]);

  return (
    <div className="p-6 w-[1200px] mx-auto">
      <WikiChangesControlPanel
        status={status}
        isConnected={isConnected}
        onToggleConnect={() => setIsConnected((prev) => !prev)}
      />

      <Table
        headerCells={TABLE_HEADER_CELLS}
        totalItemCount={filteredChanges.length}
        sortConfiguration={{
          sortParams,
          setSortParams,
        }}
        paginationConfiguration={{
          limit,
          skip,
          onLimitChange,
          optionsForShowRows,
          goToFirstPage,
        }}
        searchConfiguration={{
          searchInputValue,
          setInputSearchValue,
          goToFirstPage,
          inputProps: {
            placeholder: 'Search by article or user...',
          },
        }}
        selectFiltersConfiguration={{
          listOfSelectFilters,
          setListOfSelectFilters,
          goToFirstPage,
        }}
        tableRows={paginatedChanges.map((change, index) => (
          <WikiTableRow
            key={change.meta?.id || `${change.wiki}-${index}`}
            item={change}
          />
        ))}
      />
    </div>
  );
};

export default WikiChangesModule;