import { useServerActiveReports } from '@/context/ActiveReports';
import { resumeReportDescription } from '@/data/description';
import useReportApplicationStore from '@/store/useReportApplicationStore';
import { getBaseUrlFromServer, getReportLandingTitle } from '@/utils/url';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useGetActiveReports } from '../../../api/report';
import LexicalContent from '../../../components/common/blog/LexicalContent';
import ReportApplyBottomSheet from '../../../components/common/report/ReportApplyBottomSheet';
import ReportContentContainer from '../../../components/common/report/ReportContentContainer';
import {
  ReportHeader,
  ReportLandingIntroSection,
} from '../../../components/common/report/ReportIntroSection';
import ReportLandingNav from '../../../components/common/report/ReportLandingNav';

const ReportResumePage = () => {
  const title = getReportLandingTitle('이력서');
  const url = `${typeof window !== 'undefined' ? window.location.origin : getBaseUrlFromServer()}/report/landing/resume`;
  const description = resumeReportDescription;
  const activeReportsFromServer = useServerActiveReports();
  const { data } = useGetActiveReports();
  const activeReports = data || activeReportsFromServer;
  const report = activeReports?.resumeInfo;

  const root = JSON.parse(report?.contents || '{"root":{}}').root;

  const { initReportApplication } = useReportApplicationStore();

  const contentRef = useRef<HTMLDivElement | null>();
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initReportApplication();

    if (contentRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (bottomSheetRef.current) {
              bottomSheetRef.current.style.display = entry.isIntersecting
                ? 'block'
                : 'none';
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        },
      );
      observer.observe(contentRef.current);
      return () => {
        observer.disconnect();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        {description ? <meta name="description" content={description} /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />

        {description ? (
          <meta property="og:description" content={description} />
        ) : null}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={url} />
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
      </Helmet>
      <ReportLandingIntroSection header={<ReportHeader />} />
      <div
        id="content"
        ref={(element) => {
          contentRef.current = element;
          if (element) {
            const url = new URL(window.location.href);

            const from = url.searchParams.get('from');
            if (!from) {
              return;
            }

            if (from === 'nav') {
              element.scrollIntoView();
            }
          }
        }}
      >
        <ReportLandingNav />

        <ReportContentContainer>
          <LexicalContent node={root} />
        </ReportContentContainer>
      </div>
      {report ? (
        <ReportApplyBottomSheet report={report} ref={bottomSheetRef} />
      ) : null}
    </>
  );
};

export default ReportResumePage;