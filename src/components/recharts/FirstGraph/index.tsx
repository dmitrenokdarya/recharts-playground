'use client';

import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import { DATA } from './content';

const FirstGraph = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-100 p-5 border rounded-lg">
      <p>First Graph</p>
      <ResponsiveContainer>
        <ComposedChart data={DATA} margin={{ top: 10 }}>
          <defs>
            <linearGradient id="yellowToWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#efe51a" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="greenToWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38a019" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={{ strokeDasharray: '5 5', stroke: '#b3b6bb' }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `$${val}`}
          />
          <Area
            dataKey="revenue"
            name="Governance price"
            type="monotone"
            stroke="#096f28"
            strokeWidth={2}
            fill="url(#greenToWhite)"
            activeDot={false}
          />
          <Area
            dataKey="sales"
            name="External price"
            type="monotone"
            stroke="#dcac0d"
            strokeWidth={2}
            fill="url(#yellowToWhite)"
            activeDot={false}
          />
          <Legend
            iconType="square"
            iconSize={8}
            formatter={(value) => <span className="text-xs mr-5">{value}</span>}
          />
          <Tooltip formatter={(val) => `$${val}`}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirstGraph;
