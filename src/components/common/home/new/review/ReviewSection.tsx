import { Link } from 'react-router-dom';

import { useBlogListQuery } from '@/api/blog';
import { getBlogPathname } from '@/utils/url';
import Heading from '../ui/Heading';

const ReviewSection = () => {
  const { data } = useBlogListQuery({
    pageable: { page: 1, size: 5 },
    type: ['PROGRAM_REVIEWS', 'JOB_SUCCESS_STORIES'],
  });

  return (
    <section className="px-5">
      <Heading>생생한 참여 후기</Heading>
      <div className="custom-scrollbar mt-6 flex w-full flex-col flex-nowrap gap-4 overflow-x-auto md:w-auto md:flex-row">
        {data?.blogInfos?.map(({ blogThumbnailInfo }) => (
          <Link
            to={getBlogPathname(blogThumbnailInfo)}
            key={blogThumbnailInfo.id}
            className="review_card h-[250px] w-[385px] flex-shrink-0 md:w-80 lg:w-96 lg:min-w-96"
          >
            <img
              className="h-full w-full object-cover"
              src={blogThumbnailInfo.thumbnail ?? ''}
              alt="참여 후기 썸네일"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
