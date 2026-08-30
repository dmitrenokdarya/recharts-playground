import React from 'react';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number | null;
    payload?: {
      time?: string;
    };
  }>;
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const timeLabel = payload[0]?.payload?.time;
  const validPayload = payload.filter(
    (item) => item.value !== null && item.value !== undefined
  );

  if (!validPayload.length) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm p-3 border border-gray-200 rounded-xl shadow-lg text-xs flex flex-col gap-1.5 pointer-events-none">
      {timeLabel && <div className="text-gray-400 font-medium mb-0.5">{timeLabel}</div>}
      {validPayload.map((item, idx) => {
        const val = Number(item.value);
        let label = 'Net Flow';
        let color = '#0F766E';

        if (item.dataKey === 'topValue') {
          label = 'Issuance';
          color = '#58A5A3';
        } else if (item.dataKey === 'bottomValue') {
          label = 'Burn';
          color = '#E2C866';
        } else if (val < 0) {
          color = '#C2931E';
        }

        return (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-500 font-medium">{label}:</span>
            <span className="font-semibold text-gray-800">
              {Math.abs(val).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};