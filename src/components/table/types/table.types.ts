import { ReactNode } from 'react';
import { TSortParams } from './sort.types';

export type THeaderCell = {
  tooltipText?: string | ReactNode;
  text?: string | ReactNode;
  content?: ReactNode;
  onClick?: () => void;
  sortBy?: TSortParams['by'];
  initialSortDirection?: TSortParams['direction'];
  isRightAlign?: boolean;
  isTooltipRight?: boolean;
  class?: string;
};