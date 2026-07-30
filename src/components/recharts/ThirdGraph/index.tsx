'use client';

import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { DATA } from './content';
import { CustomTooltip } from './CustomTooltip';

const COLORS = {
  sales: '#d97706',
  revenue: '#1b3623',
  expenses: '#94a3b8',
  profit: '#2563eb',
};

const ThirdGraph = () => {
  const TARGET_VALUE = 20000;

  return (
    <div className="flex flex-col gap-4 w-full h-80 p-5 border rounded-xl bg-white shadow-sm">
      <p>Third Graph</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DATA}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />

          <Legend
            iconType="square"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-black mr-2">
                {value}
              </span>
            )}
          />

          <ReferenceLine
            y={TARGET_VALUE}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: 'target price',
              position: 'insideRight',
              dy: -10,
              fontSize: 10,
              fontWeight: 600,
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={COLORS.revenue}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="sales"
            name="Sales"
            stroke={COLORS.sales}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="profit"
            name="Profit"
            stroke={COLORS.profit}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke={COLORS.expenses}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThirdGraph;