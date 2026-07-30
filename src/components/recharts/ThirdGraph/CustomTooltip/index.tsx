import { TooltipProps } from 'recharts';

type DataItem = {
  fullDate: string;
  [key: string]: string | number;
}

type CustomPayloadItem = {
  name: string;
  value: number;
  color: string;
  dataKey?: string;
  payload: DataItem;
}

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string> & { payload?: CustomPayloadItem[] }) => {
  if (!active || !payload?.length) return null;

  const fmt = (val = 0) => `$${val.toLocaleString('en-US')}`;

  const total = payload.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="bg-black/70 backdrop-blur-md p-2 rounded-xl shadow-xl text-xs text-white flex flex-col gap-2 min-w-40">
      <p className="font-semibold">{payload[0].payload.fullDate}</p>

      <div className="flex flex-col gap-1.5">
        {payload.map(({ color, name, value, dataKey }) => (
          <div key={dataKey || name} className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium">{name}</span>
            </div>
            <span className="font-bold">{fmt(value)}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/20 flex justify-between font-bold">
        <span>Total:</span>
        <span>{fmt(total)}</span>
      </div>
    </div>
  );
};