import FirstGraph from '@/components/recharts/FirstGraph';
import FourthGraph from '@/components/recharts/FourthGraph';
import SecondGraph from '@/components/recharts/SecondGraph';
import ThirdGraph from '@/components/recharts/ThirdGraph';
import WikiChanges from '@/components/wiki';

export default function Home() {
  return (
    <div className="grid gap-20">
      <div className="grid grid-cols-2 gap-8 justify-center">
        <FirstGraph />
        <SecondGraph />
        <ThirdGraph />
        <FourthGraph />
      </div>
      <WikiChanges />
    </div>
  );
}
