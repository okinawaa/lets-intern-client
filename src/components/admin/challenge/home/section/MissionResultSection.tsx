import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import RoundedBox from '../box/RoundedBox';
import Button from '../../ui/button/Button';
import SectionHeading from '../heading/SectionHeading';
import MissionResultItem from '../item/MissionResultItem';
import axios from '../../../../../utils/axios';
import MissionTopStatusBar from '../status-bar/MissionTopStatusBar';

const MissionResultSection = () => {
  const params = useParams();

  const [missionList, setMissionList] = useState<any>();
  const [headCount, setHeadCount] = useState<number>();
  const [todayTh, setTodayTh] = useState<number>();

  const getMissionResult = useQuery({
    queryKey: ['mission', params.programId, 'simple'],
    queryFn: async () => {
      const res = await axios.get(`/mission/${params.programId}/simple`);
      const data = res.data;
      console.log(data);
      setMissionList(data.missionList);
      setHeadCount(data.finalHeadCount);
      setTodayTh(data.currentTh);
      return data;
    },
  });

  const isLoading =
    getMissionResult.isLoading ||
    !missionList ||
    headCount === undefined ||
    todayTh === undefined;

  if (isLoading) {
    return <></>;
  }

  return (
    <RoundedBox as="section" className="px-8 pb-12 pt-6">
      <div className="flex items-center justify-between">
        <SectionHeading>미션 제출 현황</SectionHeading>
        <Button to={`/admin/challenge/${params.programId}/submit-check`}>
          환급하기
        </Button>
      </div>
      <div className="mt-4 flex items-center">
        <div className="grid flex-1 grid-cols-7 gap-y-6">
          {missionList.map((mission: any) => (
            <MissionResultItem
              key={mission.missionId}
              mission={mission}
              todayTh={todayTh}
            />
          ))}
        </div>
        <div className="px-20 text-center">
          <div className="text-xl font-medium">전체 참여자</div>
          <div className="mt-1 text-3xl font-semibold">{headCount}명</div>
        </div>
      </div>
    </RoundedBox>
  );
};

export default MissionResultSection;
