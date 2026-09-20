import { memo } from 'react';
import { WikiChange } from '../types';

type Props = {
  item: WikiChange;
};

const WikiTableRow = ({ item }: Props) => {
  const formattedTime = item.timestamp
    ? new Date(item.timestamp * 1000).toLocaleTimeString()
    : '—';

  return (
    <tr className="border-b border-stroke hover:bg-stroke/30 transition-colors">
      <td className="py-3 px-4 text-body-mono-m text-primary font-medium">
        {item.wiki}
      </td>
      <td className="py-3 px-4 text-body-mono-m text-secondary">
        {item.user}
      </td>
      <td className="py-3 px-4 text-body-mono-m text-primary">
        {item.title}
      </td>
      <td className="py-3 px-4 text-body-mono-m text-secondary">
        {item.type || 'edit'}
      </td>
      <td className="py-3 px-4 text-body-mono-m text-secondary text-right">
        {formattedTime}
      </td>
    </tr>
  );
};

export default memo(WikiTableRow);