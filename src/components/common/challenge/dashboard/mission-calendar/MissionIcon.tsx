import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

import { missionSubmitToBadge } from '../../../../../utils/convert';

interface Props {
  className?: string;
  mission: any;
}

const MissionIcon = ({ className, mission }: Props) => {
  const params = useParams();

  const isAttended =
    (mission.attendanceResult === 'WAITING' ||
      mission.attendanceResult === 'PASS') &&
    mission.attendanceStatus !== 'ABSENT';

  return (
    <>
      <Link
        to={`/challenge/${params.programId}/me?scroll_to=other-mission`}
        className={clsx(
          'relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md text-white',
          className,
          {
            'bg-[#d0cfcf]': !isAttended,
            'bg-[#928DF8]': isAttended,
          },
        )}
        style={{
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%)',
        }}
      >
        <div
          className={clsx(
            'absolute left-0 top-0 aspect-square w-[30%] rounded-br-md',
            {
              'bg-[#c0c0c0]': !isAttended,
              'bg-primary': isAttended,
            },
          )}
        />
        {isAttended ? (
          <i className="mb-1 mt-2 h-[1.375rem] w-[1.375rem]">
            <img
              src="/icons/check-icon.svg"
              alt="check-icon"
              className="w-full object-cover"
            />
          </i>
        ) : (
          <i className="mb-2 mt-2 h-[1rem] w-[1rem]">
            <img
              src="/icons/x-icon.svg"
              alt="not-started-icon"
              className="w-full object-cover"
            />
          </i>
        )}
        <span className="block font-pretendard text-xs font-semibold">
          {mission.missionTh}일차
        </span>
      </Link>
      <div className="mt-2 flex items-center justify-center">
        <span
          className={clsx(
            'rounded-md px-2 py-[0.125rem] text-xs ',
            missionSubmitToBadge(mission).style,
          )}
        >
          {missionSubmitToBadge(mission)?.text || '기타'}
        </span>
      </div>
    </>
  );
};

export default MissionIcon;
