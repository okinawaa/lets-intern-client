import clsx from 'clsx';

import { missionCellWidthList } from '../../../../../../../utils/tableCellWidthList';
import TableHeadCell from '../../../../ui/table/table-head/TableHeadCell';
import TableHeadBox from '../../../../ui/table/table-head/TableHeadBox';

interface Props {
  className?: string;
}

const TableHead = ({ className }: Props) => {
  const cellWidthList = missionCellWidthList;

  return (
    <TableHeadBox className={className}>
      <TableHeadCell className={clsx(cellWidthList[0])}>회차</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[1])}>미션명</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[2])}>공개일</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[3])}>마감일</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[4])}>
        연결콘텐츠
      </TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[5])}>환급미션</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[6])}>제출현황</TableHeadCell>
      <TableHeadCell className={clsx(cellWidthList[7])} />
    </TableHeadBox>
  );
};

export default TableHead;
