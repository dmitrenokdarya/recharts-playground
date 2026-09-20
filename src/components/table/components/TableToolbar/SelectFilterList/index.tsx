import { memo } from 'react';
import { TSelectFiltersConfiguration } from '../../../types/select-filter.types';
import SelectFilter from './SelectFilter';
import Button from '../../ui/Button';

type Props = {
  selectFiltersConfiguration: TSelectFiltersConfiguration;
  hasResetButton?: boolean;
};

const SelectFilterList = ({
  selectFiltersConfiguration,
  hasResetButton,
}: Props) => {
  const { listOfSelectFilters, setListOfSelectFilters, goToFirstPage } =
    selectFiltersConfiguration;

  return (
    <div className="flex gap-3 items-center">
      {listOfSelectFilters.map((item) => {
        if (item.customComponent) {
          return <div key={item.paramName}>{item.customComponent}</div>;
        }

        return (
          <SelectFilter
            key={item?.paramName}
            paramName={item?.paramName}
            setListOfSelectFilters={setListOfSelectFilters}
            selectList={item?.selectProps?.listOfOptions || []}
            leftLabel={item?.leftLabel}
            goToFirstPage={goToFirstPage}
          />
        );
      })}
      {hasResetButton && (
        <Button variant="secondary" size="s" className="px-3 uppercase">
          Clear all
        </Button>
      )}
    </div>
  );
};

export default memo(SelectFilterList);
