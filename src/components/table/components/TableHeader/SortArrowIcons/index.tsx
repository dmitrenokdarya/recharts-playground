import { memo } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type Props = {
  isSortActive: boolean;
  isSortDesc: boolean;
};

const SortArrowIcons = ({ isSortActive, isSortDesc }: Props) => (
  <span className="flex items-center justify-center">
    {isSortActive ? (
      <ArrowDown
        size={12}
        color="var(--text-secondary)"
        className={isSortDesc ? 'rotate-180' : 'rotate-0'}
      />
    ) : (
      <ArrowUp size={12} color="var(--text-secondary)" />
    )}
  </span>
);

export default memo(SortArrowIcons);