import FirstGraph from '@/components/recharts/FirstGraph';
import FourthGraph from '@/components/recharts/FourthGraph';
import SecondGraph from '@/components/recharts/SecondGraph';
import ThirdGraph from '@/components/recharts/ThirdGraph';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-8 justify-center">
      <FirstGraph />
      <SecondGraph />
      <ThirdGraph />
      <FourthGraph />
    </div>
  );
}
