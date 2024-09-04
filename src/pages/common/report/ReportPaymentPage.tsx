import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { useGetReportDetailQuery } from '../../../api/report';
import Card from '../../../components/common/report/Card';
import Heading1 from '../../../components/common/report/Heading1';
import Heading2 from '../../../components/common/report/Heading2';
import BottomSheet from '../../../components/common/ui/BottomSheeet';
import useReportProgramInfo from '../../../hooks/useReportProgramInfo';
import useReportApplicationStore from '../../../store/useReportApplicationStore';
import { ReportPaymentSection, UsereInfoSection } from './ReportApplyPage';

const ReportPaymentPage = () => {
  const navigate = useNavigate();

  const { data: reportApplication, validate } = useReportApplicationStore();
  const { data: reportDetail } = useGetReportDetailQuery(
    reportApplication.reportId!,
  );

  return (
    <div className="px-5 md:px-32">
      <Heading1>결제하기</Heading1>
      <main className="mb-8 flex flex-col gap-10">
        <ProgramInfoSection />
        <UsereInfoSection />
        <ReportPaymentSection />
      </main>
      <BottomSheet>
        <button
          onClick={() => {
            const searchParams = new URLSearchParams();
            searchParams.set('init', 'false');
            navigate(
              `/report/apply/${reportDetail?.reportType}/${reportApplication.reportId}?${searchParams.toString()}`,
            );
          }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border-2 border-primary bg-neutral-100"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={() => {
            const { isValid, message } = validate();
            if (!isValid) {
              alert(message);
              return;
            }
            if (reportApplication.contactEmail === '') {
              alert('정보 수신용 이메일을 입력해주세요.');
              return;
            }
            navigate(`/report/toss/payment`);
          }}
          className="text-1.125-medium w-full rounded-md bg-primary py-3 text-center font-medium text-neutral-100"
        >
          결제하기
        </button>
      </BottomSheet>
    </div>
  );
};

export default ReportPaymentPage;

const ProgramInfoSection = () => {
  const { title, product, option } = useReportProgramInfo();

  return (
    <section className="flex flex-col gap-6">
      <Heading2>프로그램 정보</Heading2>
      <Card
        imgSrc="/images/report-thumbnail.png"
        imgAlt="서류 진단서 프로그램 썸네일"
        title={title!}
        content={[
          {
            label: '상품',
            text: product,
          },
          {
            label: '옵션',
            text: option,
          },
        ]}
      />
    </section>
  );
};
