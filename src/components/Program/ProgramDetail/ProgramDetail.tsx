import styled from 'styled-components';

import '../../../styles/github-markdown-light.css';
import Header from './Header';
import ApplySection from './ApplySection';
import TabBar from './TabBar';
import DetailTab from './DetailTab';
import ReviewTab from './ReviewTab';
import FAQTab from './FAQTab';
import ProgramApply from '../../../pages/ProgamApply';

interface ProgramDetailProps {
  loading: boolean;
  error: unknown;
  tab: string;
  program: any;
  faqList: any;
  reviewList: any;
  toggleOpenList: number[];
  isApplyModalOpen: boolean;
  applyPageIndex: number;
  user: any;
  handleBackButtonClick: () => void;
  handleTabChange: (tab: string) => void;
  handleToggleOpenList: (id: number) => void;
  getToggleOpened: (faqId: number) => boolean;
  handleApplyButtonClick: () => void;
  handleApplyModalClose: () => void;
  handleApplyNextButton: () => void;
  handleApplyInput: (e: any) => void;
}

const ProgramDetail = ({
  loading,
  error,
  tab,
  program,
  faqList,
  reviewList,
  toggleOpenList,
  isApplyModalOpen,
  applyPageIndex,
  user,
  handleBackButtonClick,
  handleTabChange,
  handleToggleOpenList,
  getToggleOpened,
  handleApplyButtonClick,
  handleApplyModalClose,
  handleApplyNextButton,
  handleApplyInput,
}: ProgramDetailProps) => {
  if (loading) {
    return <ProgramDetailBlock>로딩 중...</ProgramDetailBlock>;
  }

  if (error) {
    return <ProgramDetailBlock>에러 발생</ProgramDetailBlock>;
  }

  return (
    <ProgramDetailBlock>
      <Header title={program.title} onBackButtonClick={handleBackButtonClick} />
      <TabBar program={undefined} tab={tab} onTabChange={handleTabChange} />
      <TabContent>
        {tab === 'DETAIL' ? (
          <DetailTab content={program.contents} />
        ) : tab === 'REVIEW' ? (
          <ReviewTab reviewList={reviewList} />
        ) : tab === 'FAQ' ? (
          <FAQTab
            faqList={faqList}
            toggleOpenList={toggleOpenList}
            onToggleOpenList={handleToggleOpenList}
            getToggleOpened={getToggleOpened}
          />
        ) : (
          ''
        )}
      </TabContent>
      <ApplySection handleApplyButtonClick={handleApplyButtonClick} />
      {isApplyModalOpen && (
        <ProgramApply
          applyPageIndex={applyPageIndex}
          user={user}
          handleApplyModalClose={handleApplyModalClose}
          handleApplyNextButton={handleApplyNextButton}
          handleApplyInput={handleApplyInput}
        />
      )}
    </ProgramDetailBlock>
  );
};

export default ProgramDetail;

const ProgramDetailBlock = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 768px;
  }
`;

const TabContent = styled.div`
  padding: 1rem;
`;
