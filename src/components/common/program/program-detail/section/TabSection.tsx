import { useState } from 'react';

import TabBar from '../tab/tab-bar/TabBar';
import DetailTabContent from '../tab/tab-content/DetailTabContent';
import ReviewTabContent from '../tab/tab-content/ReviewTabContent';
import FAQTabContent from '../tab/tab-content/FAQTabContent';

interface TabSectionProps {
  programId: number;
  programType: string;
}

const TabSection = ({ programId, programType }: TabSectionProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <section className="sticky top-[7rem] flex-1">
      <TabBar tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div>
        {tabIndex === 0 && (
          <DetailTabContent programId={programId} programType={programType} />
        )}
        {tabIndex === 1 && (
          <ReviewTabContent programId={programId} programType={programType} />
        )}
        {tabIndex === 2 && <FAQTabContent />}
      </div>
    </section>
  );
};

export default TabSection;
