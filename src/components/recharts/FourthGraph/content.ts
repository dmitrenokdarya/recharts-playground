export interface GraphPoint {
  index: number;
  time: string;
  topSegments: number[] | null;
  bottomSegments: number[] | null;
  topValue: number | null;
  bottomValue: number | null;
  lineValue: number;
}

export const TIME_LABELS_MAP: Record<number, string> = {
  0: '07:42 PM',
  28: '12:42 AM',
  56: '05:42 AM',
  84: '10:42 AM',
  112: '03:42 PM',
};

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateSegments = (seed: number, targetSum: number) => {
  const count = 4 + Math.floor(pseudoRandom(seed) * 6);
  const rawValues = [];
  let rawSum = 0;

  for (let s = 0; s < count; s++) {
    const val = 15000 + pseudoRandom(seed + s * 13) * 180000;
    rawValues.push(val);
    rawSum += val;
  }

  return rawValues.map((v) => Math.round((v / rawSum) * targetSum));
};

export const generateData = (): GraphPoint[] => {
  const points: GraphPoint[] = [];
  const totalPoints = 120;

  for (let i = 0; i < totalPoints; i++) {
    const wave1 = Math.sin(i * 0.85) * 310000;
    const wave2 = Math.cos(i * 2.2) * 160000;
    const wave3 = Math.sin(i * 0.2) * 80000;
    const lineValue = Math.round(wave1 + wave2 + wave3);

    const isBarPoint = i % 5 === 0;
    const blockIndex = Math.floor(i / 5);

    let topSegments: number[] | null = null;
    let bottomSegments: number[] | null = null;
    let topValue: number | null = null;
    let bottomValue: number | null = null;

    if (isBarPoint) {
      const topTarget = Math.max(400000, Math.round(750000 + Math.sin(blockIndex * 0.8) * 220000));
      const bottomTarget = Math.max(350000, Math.round(650000 + Math.cos(blockIndex * 0.7) * 200000));

      topSegments = generateSegments(blockIndex * 10, topTarget);
      bottomSegments = generateSegments(blockIndex * 20 + 1, bottomTarget);

      topValue = topSegments.reduce((a, b) => a + b, 0);
      bottomValue = -bottomSegments.reduce((a, b) => a + b, 0);
    }

    const startMinutes = 19 * 60 + 42;
    const currentMinutes = startMinutes + i * 10;
    const hours24 = Math.floor((currentMinutes / 60) % 24);
    const mins = currentMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const h12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const timeString = `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;

    points.push({
      index: i,
      time: timeString,
      topSegments,
      bottomSegments,
      topValue,
      bottomValue,
      lineValue,
    });
  }

  return points;
};