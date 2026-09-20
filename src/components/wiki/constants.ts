import { TSelectFilter } from "../table/types/select-filter.types";
import { THeaderCell } from "../table/types/table.types";

export const WIKI_SSE_URL = 'https://stream.wikimedia.org/v2/stream/recentchange';

export const WIKI_FILTER_OPTIONS = [
  { value: 'all', label: 'All projects' },
  { value: 'ruwiki', label: 'Russian Wikipedia (ruwiki)' },
  { value: 'enwiki', label: 'English Wikipedia (enwiki)' },
  { value: 'commonswiki', label: 'Wikimedia Commons (commonswiki)' },
];

export const INITIAL_SELECT_FILTERS: TSelectFilter[] = [
  {
    paramName: 'wiki',
    leftLabel: 'Project',
    selectProps: {
      listOfOptions: WIKI_FILTER_OPTIONS,
    },
  },
];

export const TABLE_HEADER_CELLS: THeaderCell[] = [
  { text: 'Project', sortBy: 'wiki' },
  { text: 'User', sortBy: 'user' },
  { text: 'Article', sortBy: 'title' },
  { text: 'Type' },
  { text: 'Time', isRightAlign: true },
];