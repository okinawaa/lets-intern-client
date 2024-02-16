import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import DailyMissionInfoSection from './DailyMissionInfoSection';
import DailyMissionSubmitSection from './DailyMissionSubmitSection';

interface Props {
  dailyMission: any;
}

const DailyMissionSection = ({ dailyMission }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollTo = searchParams.get('scroll_to');
    setSearchParams({}, { replace: true });
    if (scrollTo === 'daily-mission') {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sectionRef, searchParams, setSearchParams]);

  return (
    <section
      className="mt-5 scroll-mt-[calc(6rem+1rem)] text-[#333333]"
      ref={sectionRef}
    >
      <h2 className="text-lg font-bold">데일리 미션</h2>
      <div className="mt-2 rounded bg-[#F6F8FB] px-12 py-8">
        <DailyMissionInfoSection dailyMission={dailyMission} />
        <hr className="my-8 border-[0.5px] border-[#DEDEDE]" />
        <DailyMissionSubmitSection dailyMission={dailyMission} />
      </div>
    </section>
  );
};

export default DailyMissionSection;
