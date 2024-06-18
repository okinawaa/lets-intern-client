import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TableHead from '../../../submit-check-detail/table/table-head/TableHead';
import TableRow from '../../../submit-check-detail/table/table-body/TableRow';
import axios from '../../../../../../utils/axios';
import Button from '../../../ui/button/Button';
import AccountDownloadButton from '../../top-button/AccountDownloadButton';
import RefundChangeButton from '../../top-button/RefundChangeButton';
import {
  Attendance,
  Mission,
} from '../../../../../../schema';

interface Props {
  mission: Mission;
  setIsDetailShown: (isDetailShown: boolean) => void;
  attendances: Attendance[];
}

const ChallengeSubmitDetail = ({
  mission,
  setIsDetailShown,
  attendances,
}: Props) => {

  const [isCheckedList, setIsCheckedList] = useState<Array<number>>([]);
  const [resultFilter, setResultFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <div className="rounded">
      <div className="flex justify-between bg-[#F1F1F1] px-6 py-3">
        <RefundChangeButton
          isCheckedList={isCheckedList}
          setIsCheckedList={setIsCheckedList}
        />
        {/* <AccountDownloadButton mission={mission} /> */}
      </div>
      <div className="">
        <div className="flex flex-col bg-[#F7F7F7]">
          <TableHead
            attendances={attendances ?? []}
            isCheckedList={isCheckedList}
            setIsCheckedList={setIsCheckedList}
            resultFilter={resultFilter}
            setResultFilter={setResultFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          {attendances?.map((attendance, index) => (
            <TableRow
              key={attendance.id}
              attendance={attendance}
              missionDetail={mission}
              th={index + 1}
              bgColor={(index + 1) % 2 === 1 ? 'DARK' : 'LIGHT'}
              isChecked={isCheckedList.includes(attendance.id)}
              setIsCheckedList={setIsCheckedList}
            />
          ))}
        </div>
      </div>
      <div className="mb-2 mt-4 flex justify-center">
        <Button onClick={() => setIsDetailShown(false)}>닫기</Button>
      </div>
    </div>
  );
};

export default ChallengeSubmitDetail;
