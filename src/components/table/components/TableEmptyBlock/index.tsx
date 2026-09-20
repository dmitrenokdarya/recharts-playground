import { memo } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  title: string;
  description?: string;
  subtitle?: string;
  titleClassName?: string;
};

const TableEmptyBlock = ({
  title,
  description,
  subtitle,
  className,
  titleClassName,
}: Props) => (
  <div className={clsx('flex flex-col gap-3 items-center justify-center h-full', className)}>
    <p className={clsx('text-movr-m text-primary mt-15', titleClassName)}>{title}</p>
    {description && <p className="text-body-l text-primary">{description}</p>}
    {subtitle && <p className="text-label-m text-primary">{subtitle}</p>}
  </div>
);

export default memo(TableEmptyBlock);