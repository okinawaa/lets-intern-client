import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { z } from 'zod';
import axios from '../utils/axios';

// Common schemas
const pageInfoSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  pageNum: z.number(),
  pageSize: z.number(),
});

const reportTypeSchema = z.enum(['RESUME', 'PERSONAL_STATEMENT', 'PORTFOLIO']);

export type ReportType = z.infer<typeof reportTypeSchema>;

export function convertReportTypeToDisplayName(type: ReportType) {
  switch (type) {
    case 'RESUME':
      return '이력서';
    case 'PERSONAL_STATEMENT':
      return '자기소개서';
    case 'PORTFOLIO':
      return '포트폴리오';
    default:
      return '-';
  }
}

const reportPriceTypeSchema = z.enum(['BASIC', 'PREMIUM']);

export const convertReportPriceType = (type: string) => {
  switch (type) {
    case 'BASIC':
      return '베이직';
    case 'PREMIUM':
      return '프리미엄';
    default:
      return '-';
  }
};

const reportFeedbackStatusSchema = z.enum([
  'APPLIED',
  'PENDING',
  'CONFIRMED',
  'COMPLETED',
]);

const desiredDateTypeSchema = z.enum([
  'DESIRED_DATE_1',
  'DESIRED_DATE_2',
  'DESIRED_DATE_3',
  'DESIRED_DATE_ADMIN',
]);
const reportApplicationStatusSchema = z.enum([
  'APPLIED',
  'REPORTING',
  'REPORTED',
  'COMPLETED',
]);

export const convertReportApplicationsStatus = (status: string) => {
  switch (status) {
    case 'APPLIED':
      return '신청완료';
    case 'REPORTING':
      return '진단중';
    case 'REPORTED':
      return '진단서 업로드';
    case 'COMPLETED':
      return '진단완료';
    default:
      return '-';
  }
};

export const convertReportFeedbackStatus = (status: string) => {
  switch (status) {
    case 'APPLIED':
      return '신청완료';
    case 'PENDING':
      return '일정확인중';
    case 'CONFIRMED':
      return '일정확정';
    case 'COMPLETED':
      return '진행완료';
    default:
      return '-';
  }
};

export const convertReportTypeStatus = (type: string) => {
  switch (type.toUpperCase()) {
    case 'RESUME':
      return '이력서';
    case 'PORTFOLIO':
      return '포트폴리오';
    default:
      return '자기소개서';
  }
};

// GET /api/v1/report
const getReportsForAdminSchema = z
  .object({
    reportForAdminInfos: z.array(
      z.object({
        reportId: z.number().nullable().optional(),
        reportType: reportTypeSchema.nullable().optional(),
        title: z.string().nullable().optional(),
        applicationCount: z.number().nullable().optional(),
        feedbackApplicationCount: z.number().nullable().optional(),
        visibleDate: z.string().nullable().optional(),
        createDateTime: z.string().nullable().optional(),
      }),
    ),
    pageInfo: pageInfoSchema,
  })
  .transform((data) => ({
    ...data,
    reportForAdminInfos: data.reportForAdminInfos.map((report) => ({
      ...report,
      visibleDate: report.visibleDate ? dayjs(report.visibleDate) : null,
      createDateTime: report.createDateTime
        ? dayjs(report.createDateTime)
        : null,
    })),
  }));

export const getReportsForAdminQueryKey = 'getReportsForAdmin';

export const useGetReportsForAdmin = () => {
  return useQuery({
    queryKey: [getReportsForAdminQueryKey],
    queryFn: async () => {
      const res = await axios.get('/report?size=9999');
      return getReportsForAdminSchema.parse(res.data.data);
    },
  });
};

export type AdminReportListItem = z.infer<
  typeof getReportsForAdminSchema
>['reportForAdminInfos'][0];

// POST /api/v1/report
const createReportSchema = z.object({
  reportType: reportTypeSchema,
  visibleDate: z.string().nullable().optional(),
  title: z.string(),
  contents: z.string(),
  notice: z.string(),
  priceInfo: z.array(
    z.object({
      reportPriceType: reportPriceTypeSchema,
      price: z.number(),
      discountPrice: z.number(),
    }),
  ),
  optionInfo: z.array(
    z.object({
      price: z.number(),
      discountPrice: z.number(),
      title: z.string(),
      code: z.string(),
    }),
  ),
  feedbackInfo: z.object({
    price: z.number(),
    discountPrice: z.number(),
  }),
});

export type CreateReportData = z.infer<typeof createReportSchema>;

export const usePostReportMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateReportData) => {
      await axios.post('/report', data);
      return { success: true, message: 'Report created successfully' };
    },
  });
};

// GET /api/v1/report/{reportId}
const getReportDetailSchema = z.object({
  reportId: z.number(),
  title: z.string().nullable().optional(),
  notice: z.string().nullable().optional(),
  contents: z.string().nullable().optional(),
  reportType: reportTypeSchema.nullable().optional(),
});

export const getReportDetailQueryKey = 'getReportDetail';

export const useGetReportDetailQuery = (reportId: number) => {
  return useQuery({
    queryKey: [getReportDetailQueryKey, reportId],
    queryFn: async () => {
      const res = await axios.get(`/report/${reportId}`);
      return getReportDetailSchema.parse(res.data.data);
    },
  });
};

// GET /api/v1/report/{reportId}/price
const getReportPriceDetailSchema = z.object({
  reportId: z.number(),
  reportPriceInfos: z
    .array(
      z.object({
        reportPriceType: reportPriceTypeSchema.nullable().optional(),
        price: z.number().nullable().optional(),
        discountPrice: z.number().nullable().optional(),
      }),
    )
    .nullable()
    .optional(),
  reportOptionInfos: z
    .array(
      z.object({
        reportOptionId: z.number(),
        price: z.number().nullable().optional(),
        discountPrice: z.number().nullable().optional(),
        title: z.string().nullable().optional(),
      }),
    )
    .nullable()
    .optional(),
  feedbackPriceInfo: z
    .object({
      reportFeedbackId: z.number(),
      reportPriceType: reportPriceTypeSchema.nullable().optional(),
      feedbackPrice: z.number().nullable().optional(),
      feedbackDiscountPrice: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const useGetReportPriceDetail = (reportId: number) => {
  return useQuery({
    queryKey: ['getReportPriceDetail', reportId],
    queryFn: async () => {
      // Mock data
      const mockData = {
        reportId,
        reportPriceInfos: [
          { reportPriceType: 'BASIC', price: 50000, discountPrice: 45000 },
          { reportPriceType: 'PREMIUM', price: 100000, discountPrice: 90000 },
        ],
        reportOptionInfos: [
          {
            reportOptionId: 1,
            price: 20000,
            discountPrice: 18000,
            title: '추가 피드백',
          },
          {
            reportOptionId: 2,
            price: 30000,
            discountPrice: 27000,
            title: '심층 분석',
          },
        ],
        feedbackPriceInfo: {
          reportFeedbackId: 1,
          reportPriceType: 'PREMIUM',
          feedbackPrice: 80000,
          feedbackDiscountPrice: 72000,
        },
      };

      const res = await axios.get(`/report/${reportId}/price`);

      return getReportPriceDetailSchema.parse(mockData);
    },
  });
};

// GET /api/v1/report/{reportId}/admin
const getReportDetailForAdminSchema = z.object({
  reportId: z.number(),
  reportType: reportTypeSchema,
  title: z.string(),
  contents: z.string(),
  notice: z.string(),
  reportPriceInfos: z.array(
    z.object({
      reportPriceType: reportPriceTypeSchema,
      price: z.number(),
      discountPrice: z.number(),
    }),
  ),
  reportOptionInfos: z.array(
    z.object({
      reportOptionId: z.number().nullable().optional(),
      price: z.number().nullable().optional(),
      discountPrice: z.number().nullable().optional(),
      title: z.string().nullable().optional(),
    }),
  ),
  feedbackPriceInfo: z.object({
    reportFeedbackId: z.number(),
    reportPriceType: reportPriceTypeSchema,
    feedbackPrice: z.number(),
    feedbackDiscountPrice: z.number(),
  }),
});

export type ReportDetailAdmin = z.infer<typeof getReportDetailForAdminSchema>;

export const getReportDetailForAdminQueryKey = 'getReportDetailForAdmin';

export const useGetReportDetailAdminQuery = (reportId: number) => {
  return useQuery({
    queryKey: ['getReportDetailForAdmin', reportId],
    queryFn: async () => {
      const data = await axios.get(`/report/${reportId}/admin`);
      return getReportDetailForAdminSchema.parse(data.data.data);
    },
  });
};

// GET /api/v1/report/my
const getMyReportsSchema = z
  .object({
    myReportInfos: z.array(
      z.object({
        reportId: z.number(),
        applicationId: z.number(),
        title: z.string(),
        type: reportTypeSchema,
        reportApplicationStatus: reportApplicationStatusSchema,
        applicationTime: z.string(),
        completedTime: z.string().nullable(),
      }),
    ),
    pageInfo: pageInfoSchema,
  })
  .transform((data) => ({
    ...data,
    myReportInfos: data.myReportInfos.map((report) => ({
      ...report,
      applicationTime: dayjs(report.applicationTime),
      completedTime: report.completedTime ? dayjs(report.completedTime) : null,
    })),
  }));

export const useGetMyReports = (
  reportType?: string,
  pageNumber: number = 0,
  pageSize: number = 10,
) => {
  return useQuery({
    queryKey: ['getMyReports', reportType, pageNumber, pageSize],
    queryFn: async () => {
      // Mock data
      const mockData = {
        myReportInfos: [
          {
            reportId: 1,
            applicationId: 101,
            title: '이력서 진단 프로그램',
            type: 'RESUME',
            reportApplicationStatus: 'COMPLETED',
            applicationTime: '2024-08-01T10:00:00',
            completedTime: '2024-08-05T15:30:00',
          },
          {
            reportId: 2,
            applicationId: 102,
            title: '자기소개서 진단 프로그램',
            type: 'PERSONAL_STATEMENT',
            reportApplicationStatus: 'APPLIED',
            applicationTime: '2024-08-10T14:00:00',
            completedTime: null,
          },
        ],
        pageInfo: {
          totalElements: 5,
          totalPages: 1,
          currentPage: pageNumber,
          currentElements: 2,
        },
      };

      return getMyReportsSchema.parse(mockData);
    },
  });
};

// GET /api/v1/report/my/feedback
const getMyReportFeedbacksSchema = z
  .object({
    myReportFeedbackInfos: z.array(
      z.object({
        reportId: z.number(),
        applicationId: z.number(),
        title: z.string(),
        type: reportTypeSchema,
        reportFeedbackStatus: reportFeedbackStatusSchema,
        zoomLink: z.string().nullable(),
        zoomPassword: z.string().nullable(),
        desiredDate1: z.string().nullable(),
        desiredDate2: z.string().nullable(),
        desiredDate3: z.string().nullable(),
        applicationTime: z.string(),
        confirmedTime: z.string().nullable(),
      }),
    ),
    pageInfo: pageInfoSchema,
  })
  .transform((data) => ({
    ...data,
    myReportFeedbackInfos: data.myReportFeedbackInfos.map((feedback) => ({
      ...feedback,
      desiredDate1: feedback.desiredDate1 ? dayjs(feedback.desiredDate1) : null,
      desiredDate2: feedback.desiredDate2 ? dayjs(feedback.desiredDate2) : null,
      desiredDate3: feedback.desiredDate3 ? dayjs(feedback.desiredDate3) : null,
      applicationTime: dayjs(feedback.applicationTime),
      confirmedTime: feedback.confirmedTime
        ? dayjs(feedback.confirmedTime)
        : null,
    })),
  }));

export const useGetMyReportFeedbacks = (
  reportType?: string,
  pageNumber: number = 0,
  pageSize: number = 10,
) => {
  return useQuery({
    queryKey: ['getMyReportFeedbacks', reportType, pageNumber, pageSize],
    queryFn: async () => {
      // Mock data
      const mockData = {
        myReportFeedbackInfos: [
          {
            reportId: 1,
            applicationId: 101,
            title: '이력서 1:1 첨삭',
            type: 'RESUME',
            reportFeedbackStatus: 'COMPLETED',
            zoomLink: 'https://zoom.us/j/1234567890',
            zoomPassword: '123456',
            desiredDate1: '2024-08-15T10:00:00',
            desiredDate2: '2024-08-16T14:00:00',
            desiredDate3: '2024-08-17T16:00:00',
            applicationTime: '2024-08-01T10:00:00',
            confirmedTime: '2024-08-15T10:00:00',
          },
          {
            reportId: 2,
            applicationId: 102,
            title: '자기소개서 1:1 첨삭',
            type: 'PERSONAL_STATEMENT',
            reportFeedbackStatus: 'PENDING',
            zoomLink: null,
            zoomPassword: null,
            desiredDate1: '2024-08-20T11:00:00',
            desiredDate2: '2024-08-21T15:00:00',
            desiredDate3: '2024-08-22T17:00:00',
            applicationTime: '2024-08-10T14:00:00',
            confirmedTime: null,
          },
        ],
        pageInfo: {
          totalElements: 5,
          totalPages: 1,
          currentPage: pageNumber,
          currentElements: 2,
        },
      };

      return getMyReportFeedbacksSchema.parse(mockData);
    },
  });
};

const reportApplicationsForAdminInfoSchema = z.object({
  applicationId: z.number(),
  name: z.string(),
  contactEmail: z.string(),
  phoneNumber: z.string(),
  wishJob: z.string().nullable(),
  message: z.string().nullable(),
  reportApplicationStatus: reportApplicationStatusSchema,
  applyFileUrl: z.string().nullable(),
  reportFileUrl: z.string().nullable(),
  recruitmentFileUrl: z.string().nullable(),
  reportFeedbackApplicationId: z.number().nullable(),
  reportFeedbackStatus: reportFeedbackStatusSchema.nullable(),
  zoomLink: z.string().nullable(),
  desiredDate1: z.string().nullable(),
  desiredDate2: z.string().nullable(),
  desiredDate3: z.string().nullable(),
  desiredDateAdmin: z.string().nullable(),
  desiredDateType: desiredDateTypeSchema.nullable(),
  createDate: z.string().nullable(),
  paymentId: z.number().nullable(),
  orderId: z.string().nullable(),
  reportPriceType: reportPriceTypeSchema.nullable(),
  couponTitle: z.string().nullable(),
  finalPrice: z.number().nullable(),
  isRefunded: z.boolean().nullable(),
});

export type reportApplicationsForAdminInfoType = z.infer<
  typeof reportApplicationsForAdminInfoSchema
>;

// GET /api/v1/report/applications
const getReportApplicationsForAdminSchema = z.object({
  reportApplicationsForAdminInfos: z.array(
    reportApplicationsForAdminInfoSchema,
  ),
  pageInfo: pageInfoSchema,
});

export const useGetReportApplicationsForAdminQueryKey =
  'getReportApplicationsForAdmin';

export const useGetReportApplicationsForAdmin = ({
  reportId,
  reportType,
  priceType,
  isApplyFeedback,
  pageable: { page = 0, size = 10 },
  enabled = true,
}: {
  reportId?: number;
  reportType?: 'RESUME' | 'PERSONAL_STATEMENT' | 'PORTFOLIO';
  priceType?: 'BASIC' | 'PREMIUM';
  isApplyFeedback?: boolean;
  pageable: {
    page?: number;
    size?: number;
  };
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [
      useGetReportApplicationsForAdminQueryKey,
      reportId,
      reportType,
      priceType,
      isApplyFeedback,
      page,
      size,
    ],
    queryFn: async () => {
      const res = await axios.get('/report/applications', {
        params: {
          reportId,
          reportType,
          priceType,
          isApplyFeedback,
          page,
          size,
        },
      });
      return getReportApplicationsForAdminSchema.parse(res.data.data);

      // Mock data
      // const mockData = {
      //   reportApplicationsForAdminInfos: [
      //     {
      //       applicationId: 101,
      //       name: '김철수',
      //       contactEmail: 'chulsoo.kim@example.com',
      //       phoneNumber: '010-1234-5678',
      //       wishJob: '소프트웨어 엔지니어',
      //       message:
      //         '경력 3년차 개발자입니다. 피드백 부탁드립니다.경력 3년차 개발자입니다. 피드백 부탁드립니다.경력 3년차 개발자입니다. 피드백 부탁드립니다.경력 3년차 개발자입니다. 피드백 부탁드립니다.경력 3년차 개발자입니다. 피드백 부탁드립니다.경력 3년차 개발자입니다. 피드백 부탁드립니다.',
      //       reportApplicationStatus: 'COMPLETED',
      //       applyFileUrl: 'https://example.com/apply/101.pdf',
      //       reportFileUrl: 'https://example.com/report/101.pdf',
      //       recruitmentFileUrl: 'https://example.com/recruitment/101.pdf',
      //       reportFeedbackApplicationId: 1,
      //       reportFeedbackStatus: 'COMPLETED',
      //       zoomLink: 'https://zoom.us/j/1234567890',
      //       desiredDate1: '2024-08-15T10:00:00',
      //       desiredDate2: '2024-08-16T14:00:00',
      //       desiredDate3: '2024-08-17T16:00:00',
      //       desiredDateAdmin: '2024-08-15T10:00:00',
      //       desiredDateType: 'DESIRED_DATE_1',
      //       createDate: '2024-08-01T10:00:00',
      //       paymentId: 1001,
      //       orderId: 'ORDER-1001',
      //       reportPriceType: 'PREMIUM',
      //       couponTitle: '여름 할인 10%',
      //       finalPrice: 90000,
      //       isRefunded: false,
      //     },
      //     {
      //       applicationId: 102,
      //       name: '이영희',
      //       contactEmail: 'younghee.lee@example.com',
      //       phoneNumber: '010-9876-5432',
      //       wishJob: '마케팅 매니저',
      //       message: '마케팅 분야로 전직을 고민 중입니다.',
      //       reportApplicationStatus: 'APPLIED',
      //       applyFileUrl: 'https://example.com/apply/102.pdf',
      //       reportFileUrl: null,
      //       recruitmentFileUrl: 'https://example.com/recruitment/102.pdf',
      //       reportFeedbackApplicationId: 2,
      //       reportFeedbackStatus: 'APPLIED',
      //       zoomLink: null,
      //       desiredDate1: '2024-08-20T11:00:00',
      //       desiredDate2: '2024-08-21T15:00:00',
      //       desiredDate3: '2024-08-22T17:00:00',
      //       desiredDateAdmin: null,
      //       desiredDateType: null,
      //       createDate: '2024-08-10T14:00:00',
      //       paymentId: 1002,
      //       orderId: 'ORDER-1002',
      //       reportPriceType: 'BASIC',
      //       couponTitle: null,
      //       finalPrice: 50000,
      //       isRefunded: false,
      //     },
      //   ],
      //   pageInfo: {
      //     totalElements: 10,
      //     totalPages: 1,
      //     currentPage: page,
      //     currentElements: 2,
      //   },
      // };

      // return getReportApplicationsForAdminSchema.parse(mockData);
    },
    enabled,
  });
};

// GET /api/v1/report/application/options
const getReportApplicationOptionsForAdminSchema = z.object({
  reportApplicationOptionForAdminInfos: z.array(
    z.object({
      reportApplicationOptionId: z.number(),
      price: z.number(),
      discountPrice: z.number(),
      title: z.string(),
      code: z.string(),
    }),
  ),
});

export const useGetReportApplicationOptionsForAdminQueryKey =
  'getReportApplicationOptionsForAdmin';

export const useGetReportApplicationOptionsForAdmin = ({
  applicationId,
  code,
  priceType,
  reportId,
  enabled,
}: {
  reportId?: number;
  applicationId?: number;
  priceType?: string;
  code?: string;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: [
      useGetReportApplicationOptionsForAdminQueryKey,
      reportId,
      applicationId,
      priceType,
      code,
    ],
    queryFn: async () => {
      // Mock data
      const mockData = {
        reportApplicationOptionForAdminInfos: [
          {
            reportApplicationOptionId: 1,
            price: 20000,
            discountPrice: 18000,
            title: '추가 피드백',
            code: 'EXTRA_FEEDBACK',
          },
          {
            reportApplicationOptionId: 2,
            price: 30000,
            discountPrice: 27000,
            title: '심층 분석',
            code: 'DEEP_ANALYSIS',
          },
        ],
      };

      return getReportApplicationOptionsForAdminSchema.parse(mockData);
    },
    enabled,
  });
};

export const usePatchApplicationDocument = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      applicationId,
      reportUrl,
    }: {
      applicationId: number;
      reportUrl: string;
    }) => {
      const res = await axios.patch(
        `/report/application/${applicationId}/document`,
        {
          reportUrl,
        },
      );
      // Mock API call
      // return { success: true, message: 'Document uploaded successfully' };
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetReportApplicationsForAdminQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};

export const usePatchReportApplicationSchedule = ({
  successCallback,
  errorCallback,
}: {
  successCallback?: () => void;
  errorCallback?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reportId,
      applicationId,
      desiredDateType,
      desiredDateAdmin,
    }: {
      reportId: number;
      applicationId: number;
      desiredDateType:
        | 'DESIRED_DATE_1'
        | 'DESIRED_DATE_2'
        | 'DESIRED_DATE_3'
        | 'DESIRED_DATE_ADMIN';
      desiredDateAdmin: string;
    }) => {
      const res = await axios.patch(
        `/report/${reportId}/application/${applicationId}/schedule`,
        {
          desiredDateType,
          desiredDateAdmin,
        },
      );

      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useGetReportApplicationsForAdminQueryKey],
      });
      successCallback && successCallback();
    },
    onError: (error: Error) => {
      errorCallback && errorCallback(error);
    },
  });
};

// POST /api/v1/report/application
const createReportApplicationSchema = z.object({
  reportId: z.number(),
  reportPriceType: reportPriceTypeSchema,
  optionIds: z.array(z.number()),
  isFeedbackApplied: z.boolean(),
  couponId: z.number().nullable(),
  paymentKey: z.string(),
  orderId: z.string(),
  amount: z.string(),
  discountPrice: z.number(),
  applyUrl: z.string(),
  recruitmentUrl: z.string(),
  desiredDate1: z.string(),
  desiredDate2: z.string(),
  desiredDate3: z.string(),
  wishJob: z.string(),
  message: z.string(),
});

export type CreateReportApplication = z.infer<
  typeof createReportApplicationSchema
>;

export const useCreateReportApplication = () => {
  return useMutation({
    mutationFn: async (data: CreateReportApplication) => {
      // Mock API call
      console.log('Creating report application:', data);
      return {
        success: true,
        message: 'Report application created successfully',
        applicationId: 103,
      };
    },
  });
};

// DELETE /api/v1/report/{reportId}
export const useDeleteReport = () => {
  return useMutation({
    mutationFn: async (reportId: number) => {
      // Mock API call
      console.log('Deleting report:', reportId);
      return { success: true, message: 'Report deleted successfully' };
    },
  });
};

// PATCH /api/v1/report/{reportId}
const updateReportSchema = z.object({
  reportType: reportTypeSchema.optional(),
  visibleDate: z.string().optional(),
  title: z.string().optional(),
  contents: z.string().optional(),
  notice: z.string().optional(),
  priceInfo: z
    .array(
      z.object({
        reportPriceType: reportPriceTypeSchema,
        price: z.number(),
        discountPrice: z.number(),
      }),
    )
    .optional(),
  optionInfo: z
    .array(
      z.object({
        price: z.number(),
        discountPrice: z.number(),
        title: z.string(),
        code: z.string(),
      }),
    )
    .optional(),
  feedbackInfo: z
    .object({
      price: z.number(),
      discountPrice: z.number(),
    })
    .optional(),
});

export type UpdateReportData = z.infer<typeof updateReportSchema>;

export const usePatchReportMutation = () => {
  return useMutation({
    mutationFn: async ({
      reportId,
      data,
    }: {
      reportId: number;
      data: z.infer<typeof updateReportSchema>;
    }) => {
      await axios.patch(`/report/${reportId}`, data);
      return { success: true, message: 'Report updated successfully' };
    },
  });
};

// Utility function to generate mock data (for demonstration purposes)
// const generateMockData = <T extends z.ZodType>(schema: T): z.infer<T> => {
//   const shape = schema._def.shape();
//   const mockData: any = {};

//   for (const [key, value] of Object.entries(shape)) {
//     if (value instanceof z.ZodString) {
//       mockData[key] = 'mock string';
//     } else if (value instanceof z.ZodNumber) {
//       mockData[key] = 123;
//     } else if (value instanceof z.ZodBoolean) {
//       mockData[key] = true;
//     } else if (value instanceof z.ZodArray) {
//       mockData[key] = [generateMockData(value.element)];
//     } else if (value instanceof z.ZodObject) {
//       mockData[key] = generateMockData(value);
//     } else if (value instanceof z.ZodEnum) {
//       mockData[key] = value.options[0];
//     } else if (value instanceof z.ZodNullable) {
//       mockData[key] = null;
//     } else {
//       mockData[key] = undefined;
//     }
//   }

//   return schema.parse(mockData);
// };
