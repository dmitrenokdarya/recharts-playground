import { memo, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useSelectFilter } from '../../../../hooks/use-select-filter.hook';
import {
  TSelectFilter,
  TSelectFiltersConfiguration,
  TSelectOption,
} from '../../../../types/select-filter.types';
import clsx from 'clsx';
import CustomPopover from '../../../ui/CustomPopover';

type Props = {
  paramName: TSelectFilter['paramName'];
  setListOfSelectFilters: TSelectFiltersConfiguration['setListOfSelectFilters'];
  selectList: TSelectOption[];
  goToFirstPage: TSelectFiltersConfiguration['goToFirstPage'];
  leftLabel?: string;
};

const SelectFilter = ({
  paramName,
  setListOfSelectFilters,
  selectList,
  goToFirstPage,
  leftLabel,
}: Props) => {
  const { handleChange } = useSelectFilter({
    setListOfSelectFilters,
    paramName,
    goToFirstPage,
  });

  const searchParams = useSearchParams();

  const currentOption = useMemo(() => {
    const urlValue = searchParams.get(paramName);
    if (!urlValue) return selectList[0];

    return (
      selectList.find((opt) => String(opt.value) === String(urlValue)) ||
      selectList[0]
    );
  }, [selectList, searchParams, paramName]);

  const selectedLabel = useMemo(
    () =>
      currentOption?.label ??
      (currentOption ? String(currentOption.value) : undefined),
    [currentOption],
  );

  const onSelect = (option: TSelectOption) => {
    handleChange(option);
  };

  const popoverContent = (
    <div
      role="listbox"
      className="min-w-[120px] bg-default border border-stroke shadow-lg py-1"
    >
      {selectList.map((opt) => {
        const active = opt.value === currentOption?.value;
        const optionLabel = opt?.label ?? String(opt.value);

        return (
          <button
            key={String(opt.value)}
            role="option"
            aria-selected={active}
            className={clsx(
              'flex items-center w-full px-3 py-2 cursor-pointer text-movr-m transition-colors',
              active
                ? 'bg-stroke text-primary'
                : 'text-secondary hover:text-primary hover:bg-stroke',
            )}
            onClick={() => onSelect(opt)}
            type="button"
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );

  return (
    <CustomPopover
      content={popoverContent}
      side="bottom"
      align="end"
      sideOffset={6}
    >
      <button className="flex items-center gap-1 cursor-pointer" type="button">
        <span className="text-movr-m text-secondary">{leftLabel}:</span>
        <span className="text-movr-m !normal-case text-primary">
          {selectedLabel}
        </span>
        <ChevronDown size={16} color="var(--text-secondary)" />
      </button>
    </CustomPopover>
  );
};

export default memo(SelectFilter);
