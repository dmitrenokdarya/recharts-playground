import { memo } from 'react';

const TableNotFoundBlock = () => (
  <tr>
  <td colSpan={5}>
    <div className="h-20 flex items-center justify-center">
      Nothing was found
    </div>
  </td>
</tr>
);

export default memo(TableNotFoundBlock);