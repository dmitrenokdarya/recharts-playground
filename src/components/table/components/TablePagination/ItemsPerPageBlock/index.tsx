import { memo, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  TOptionsForShowRows,
  TPaginationConfiguration,
} from '../../../types/pagination.types';
import clsx from 'clsx';
import Button from '../../ui/Button';
import CustomPopover from '../../ui/CustomPopover';

type Props = {
  limit: number;
  optionsForShowRows: TPaginationConfiguration['optionsForShowRows'];
  handleChangeSelect: (newData: TOptionsForShowRows) => void;
};

const ItemsPerPageBlock = ({
  optionsForShowRows,
  limit,
  handleChangeSelect,
}: Props) => {
  const content = useMemo(
    () => (
      <div className="grid bg-default border border-stroke shadow-[0px_4.38px_4.63px_0px_#00000007,0px_20px_13px_0px_#0000000B,0px_50.63px_34.88px_0px_#0000000F,0px_100px_80px_0px_#00000017] p-1 min-w-30">
        {optionsForShowRows.map((item) => {
          const isSelected = item.value === limit;

          return (
            <button
              key={item.value}
              type="button"
              className={clsx(
                'text-body-mono-m py-2.5 px-2 flex w-full rounded-none transition-colors cursor-pointer',
                isSelected
                  ? 'bg-stroke text-primary'
                  : 'text-secondary hover:bg-stroke hover:text-primary',
              )}
              onClick={() => handleChangeSelect(item)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    ),
    [handleChangeSelect, limit, optionsForShowRows],
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-movr-m text-secondary whitespace-nowrap">Show rows:</p>
      <CustomPopover content={content} side="top" align="end">
        <Button
          variant="secondary"
          size="m"
          className="justify-start gap-9 px-3 py-2.5 rounded-none"
          rightContent={
            <ChevronDown
              color="var(--text-secondary)"
              size={16}
              className="ml-[auto]"
            />
          }
        >
          <span className="text-body-mono-m text-secondary">{limit}</span>
        </Button>
      </CustomPopover>
    </div>
  );
};

export default memo(ItemsPerPageBlock);
