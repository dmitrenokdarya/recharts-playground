'use client';

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { DATA } from './content';

const SecondGraph = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-100 p-5 border rounded-lg">
      <p>Second Graph</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} margin={{ top: 10 }}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend
            iconType="square"
            iconSize={8}
            wrapperStyle={{ paddingTop: '15px' }}
            formatter={(value) => (
              <span className="text-xs text-black mr-2">
                {value}
              </span>
            )}
          />
          <Bar
            dataKey="sales"
            name="External price"
            stackId="a"
            fill="#10b981"
          />
          <Bar
            dataKey="revenue"
            name="Governance price"
            stackId="a"
            fill="#6366f1"
          />
          <Bar
            dataKey="expenses"
            name="External price"
            stackId="a"
            fill="#f59e0b"
          />
          <Bar
            dataKey="profit"
            name="External price"
            stackId="a"
            fill="#06b6d4"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SecondGraph;