import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetReportPriceDetail } from '../api/report';
import useReportApplicationStore from '../store/useReportApplicationStore';

export interface ReportPriceInfo {
  report: number;
  feedback: number;
  discount: number;
  coupon: number;
  total: number;
}

export default function useReportPayment() {
  const { reportId } = useParams();

  // Sprint7 서류 진단 쿠폰 기능 없음
  const [priceInfo, setPriceInfo] = useState({
    report: 0,
    feedback: 0,
    discount: 0,
    coupon: 0,
    total: 0,
  });

  const { data: reportApplication } = useReportApplicationStore();
  const { data: reportPriceDetail } = useGetReportPriceDetail(Number(reportId));

  useEffect(() => {
    if (reportPriceDetail === undefined) return;

    const reportPriceInfo = reportPriceDetail.reportPriceInfos?.find(
      (info) => info.reportPriceType === reportApplication.reportPriceType,
    );
    const feedbackPriceInfo = reportPriceDetail.feedbackPriceInfo;
    const report = reportPriceInfo?.price as number;
    const feedback = feedbackPriceInfo?.feedbackPrice as number;
    let discount = 0;
    let total = 0;

    // 할인 금액
    discount += reportPriceInfo?.discountPrice as number;
    reportApplication.optionIds.forEach((optionId) => {
      discount += reportPriceDetail.reportOptionInfos?.find(
        (info) => info.reportOptionId === optionId,
      )?.discountPrice as number;
    });
    // 1:1 피드백 가격
    if (reportApplication.isFeedbackApplied)
      discount += feedbackPriceInfo?.feedbackDiscountPrice as number;
    // 총 결제금액
    total = report + feedback - discount;

    setPriceInfo({
      report,
      feedback,
      discount,
      coupon: 0,
      total,
    });
  }, [reportApplication, reportPriceDetail]);

  return { state: priceInfo, dispatch: setPriceInfo };
}
