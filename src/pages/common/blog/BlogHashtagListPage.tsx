import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useBlogTagQuery, useInfiniteBlogListQuery } from '../../../api/blog';
import { TagType } from '../../../api/blogSchema';
import BlogCard from '../../../components/common/blog/BlogCard';

const BlogHashtagListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isToggle, setIsToggle] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

  const { data: tagListData = [], isLoading: tagListIsLoading } =
    useBlogTagQuery();
  const {
    data: blogListData,
    fetchNextPage,
    hasNextPage,
    isLoading: blogListIsLoading,
  } = useInfiniteBlogListQuery({
    tagId: selectedTag?.id,
    pageable: { page: 0, size: 5 },
  });

  const handleTagClick = (tag: TagType) => {
    searchParams.set('tagId', tag.id.toString());
    setSearchParams(searchParams);
    setIsToggle(false);
  };

  useEffect(() => {
    // 쿼리 파라미터에 tagId가 있을 경우 해시 태그 검색
    if (tagListData.length === 0) return;

    const tagId = searchParams.get('tagId');
    if (!tagId) {
      setSelectedTag(null);
      return;
    }

    const item = tagListData.find((tag) => tag.id === Number(tagId));
    setSelectedTag(item ?? null);
  }, [searchParams, tagListData]);

  return (
    <div className="mx-auto w-full max-w-[1200px] flex-1 flex-col items-center px-5 md:px-10">
      <div className="flex w-full flex-col items-center md:px-[100px] md:py-10">
        <div className="flex w-full flex-col items-center gap-y-8 py-8">
          <div className="flex w-full flex-col gap-y-5">
            <div className="flex items-center gap-x-2">
              <img
                src="/icons/x-close.svg"
                alt="hashtag"
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  // 선택한 해시태그가 없으면 블로그 목록으로 이동
                  if (!searchParams.has('tagId')) {
                    navigate('/blog/list');
                    return;
                  }
                  searchParams.delete('tagId');
                  setSearchParams(searchParams);
                }}
              />
              <h2 className="text-small18 font-bold text-neutral-0">
                해시태그 검색
              </h2>
              <span className="text-small18 text-primary">
                {blogListData?.pages[0].pageInfo.totalElements}건
              </span>
            </div>
            <div className="relative flex flex-col">
              <div
                className="flex w-full cursor-pointer items-center justify-between rounded-full bg-primary-10 px-5 py-3 text-xsmall16 text-neutral-0"
                onClick={() => setIsToggle(!isToggle)}
              >
                {!selectedTag ? (
                  <span>전체</span>
                ) : (
                  <span className="blog_hashtag">#{selectedTag.title}</span>
                )}
                <img
                  src="/icons/Caret_Down_MD.svg"
                  alt="arrow-down"
                  className={`h-6 w-6 transition-all duration-150 ${isToggle ? 'rotate-180' : ''}`}
                />
              </div>
              <div
                className={`absolute bottom-[-10px] left-0 z-10 flex w-full translate-y-full flex-col overflow-y-scroll rounded-md transition-all duration-150 ${isToggle ? 'max-h-96' : 'max-h-0'}`}
              >
                {tagListIsLoading ? (
                  <div className="w-full bg-neutral-90 px-4 py-[14px] text-xsmall16 text-primary">
                    로딩중입니다.
                  </div>
                ) : (
                  tagListData.map((tag) => (
                    <div
                      key={tag.id}
                      className="w-full cursor-pointer bg-neutral-90 px-4 py-[14px] text-xsmall16 text-primary"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag.title}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <InfiniteScroll
            className="w-full flex-1 gap-y-8"
            hasMore={hasNextPage}
            loadMore={() => {
              fetchNextPage();
            }}
          >
            {blogListIsLoading ? (
              <div className="w-full py-6 text-center">
                블로그를 가져오는 중입니다..
              </div>
            ) : (
              <div className="flex w-full flex-wrap gap-4">
                {!blogListData || blogListData.pages[0].blogInfos.length < 1 ? (
                  <div className="w-full py-6 text-center text-neutral-40">
                    등록된 글이 없습니다.
                  </div>
                ) : (
                  blogListData.pages.map((page, pageIdx) =>
                    page.blogInfos?.map((blogInfo, blogIdx) => (
                      <React.Fragment key={blogInfo.blogThumbnailInfo.id}>
                        <BlogCard
                          key={blogInfo.blogThumbnailInfo.id}
                          blogInfo={blogInfo}
                        />
                        {!(
                          pageIdx === blogListData.pages.length - 1 &&
                          blogIdx === page.blogInfos.length - 1
                        ) && (
                          <hr className="h-0.5 w-full border-t border-neutral-80" />
                        )}
                      </React.Fragment>
                    )),
                  )
                )}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default BlogHashtagListPage;
