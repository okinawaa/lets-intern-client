import AboutHeader from '../../../components/common/about/header/AboutHeader';
import CommunitySection from '../../../components/common/about/section/CommunitySection';
import EndSection from '../../../components/common/about/section/EndSection';
import IntroSection from '../../../components/common/about/section/introduction/IntroSection';
import PartnerSection from '../../../components/common/about/section/PartnerSection';
import ProblemSection from '../../../components/common/about/section/problem/ProblemSection';
import ProgramMenuSection from '../../../components/common/about/section/ProgramMenuSection';
import ResultSection from '../../../components/common/about/section/result/ResultSection';
import ReviewSection from '../../../components/common/about/section/ReviewSection';
import SolutionSection from '../../../components/common/about/section/SolutionSection';

const About = () => {
  return (
    <>
      <AboutHeader />
      <ProblemSection />
      <SolutionSection />
      <IntroSection />
      <ProgramMenuSection />
      <CommunitySection />
      <ResultSection />
      <ReviewSection />
      <PartnerSection />
      <EndSection />
      {/* <BottomSection /> */}
    </>
  );
};

export default About;
