'use client';

import { useMemo } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { generateData, TIME_LABELS_MAP } from './content';
import { CustomTooltip } from './CustomTooltip';

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    topSegments?: number[];
    bottomSegments?: number[];
  };
  dataKey?: string;
}

const CustomBar = (props: CustomBarProps) => {
  const { x = 0, y = 0, width = 0, height = 0, payload, dataKey } = props;
  const isNegative = dataKey === 'bottomValue';
  const segments = isNegative ? payload?.bottomSegments : payload?.topSegments;

  if (!segments || segments.length === 0 || !height) return null;

  const barWidth = width * 4.1;
  const absHeight = Math.abs(height);

  const y0 = isNegative ? y - absHeight : y + absHeight;
  const totalVal = segments.reduce((a, b) => a + b, 0);
  if (totalVal === 0) return null;

  const gap = 1.5;
  const baseColor = isNegative ? '#E2C866' : '#58A5A3';

  const bricks = [];
  let currentOffset = 0;

  for (let idx = 0; idx < segments.length; idx++) {
    const segVal = segments[idx];
    const segRatio = segVal / totalVal;
    const rawSegH = segRatio * absHeight;
    const segH = Math.max(1, rawSegH - gap);

    const progress = idx / (segments.length - 1 || 1);
    const opacity = 0.35 + progress * 0.65;

    let rectY: number;
    if (isNegative) {
      rectY = y0 + currentOffset;
      currentOffset += rawSegH;
    } else {
      currentOffset += rawSegH;
      rectY = y0 - currentOffset;
    }

    bricks.push(
      <rect
        key={idx}
        x={x}
        y={rectY}
        width={barWidth}
        height={segH}
        fill={baseColor}
        opacity={opacity}
        rx={0.5}
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return <g style={{ pointerEvents: 'none' }}>{bricks}</g>;
};

const FourthGraph = () => {
  const data = useMemo(() => generateData(), []);

  const gradientOffset = useMemo(() => {
    let max = -Infinity;
    let min = Infinity;
    data.forEach((d) => {
      if (d.lineValue > max) max = d.lineValue;
      if (d.lineValue < min) min = d.lineValue;
    });
    if (max <= 0) return 0;
    if (min >= 0) return 1;
    return max / (max - min);
  }, [data]);

  const formatYAxis = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue === 0) return '0';
    if (absValue >= 1000000) return `${absValue / 1000000}M`;
    if (absValue >= 1000) return `${absValue / 1000}K`;
    return `${absValue}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full p-6 border rounded-2xl bg-white shadow-sm">
      <p>Fourth Graph</p>
      <div style={{ width: '100%', height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            barGap="-100%"
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="lineSplitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset={gradientOffset} stopColor="#0F766E" stopOpacity={1} />
                <stop offset={gradientOffset} stopColor="#C2931E" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

            <XAxis
              dataKey="index"
              axisLine={false}
              tickLine={false}
              ticks={[0, 28, 56, 84, 112]}
              tickFormatter={(idx: number) => TIME_LABELS_MAP[idx] || ''}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />

            <YAxis
              domain={[-750000, 1000000]}
              ticks={[-500000, 0, 500000, 1000000]}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="topValue"
              shape={<CustomBar />}
              isAnimationActive={false}
            />

            <Bar
              dataKey="bottomValue"
              shape={<CustomBar />}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="lineValue"
              stroke="url(#lineSplitGradient)"
              strokeWidth={1.8}
              dot={false}
              activeDot={{
                r: 4,
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FourthGraph;