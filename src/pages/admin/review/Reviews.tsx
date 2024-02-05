import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from '../../../utils/axios';
import TableHead from '../../../components/admin/review/reviews/table-content/TableHead';
import TableBody from '../../../components/admin/review/reviews/table-content/TableBody';
import Table from '../../../components/admin/ui/table/Table';
import AdminPagination from '../../../components/admin/ui/pagination/AdminPagination';

import classes from './Reviews.module.scss';

const Reviews = () => {
  const [searchParams] = useSearchParams();
  const [programList, setProgramList] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const sizePerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const currentPage = searchParams.get('page');
      const params = {
        size: sizePerPage,
        page: currentPage,
      };
      try {
        const res = await axios.get('/program/admin', { params });
        setProgramList(res.data.programList);
        setMaxPage(res.data.pageInfo.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [searchParams]);

  const copyReviewCreateLink = (programId: number) => {
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/program/${programId}/review/create`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      })
      .catch((err) => {
        console.error('복사에 실패했습니다:', err);
      });
  };

  return (
    <div className="p-8">
      <header className={classes.header}>
        <h1 className={classes.heading}>후기 관리</h1>
      </header>
      <main className={classes.main}>
        <Table minWidth={1000}>
          <TableHead />
          <TableBody
            programList={programList}
            copyReviewCreateLink={copyReviewCreateLink}
          />
        </Table>
        {programList.length > 0 && (
          <div className={classes.pagination}>
            <AdminPagination maxPage={maxPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Reviews;
