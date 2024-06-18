import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';

import { missionSubmitToBadge } from '../../../../../utils/convert';
import { Schedule } from '../../../../../schema';

interface Props {
  schedule: Schedule;
  className: string;
}

const MissionTodayIcon = ({ schedule, className }: Props) => {
  const params = useParams();
  const mission = schedule.missionInfo;
  const attendance = schedule.attendanceInfo;

  return (
    <>
      <Link
        to={`/challenge/${params.programId}/me?scroll_to=daily-mission`}
        className={clsx(
          'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xs shadow-[0px_0px_10px_rgba(0,0,0,0.1)]',
          className,
        )}
      >
        {attendance.status !== 'ABSENT' ? (
          <div className="mb-[0.175rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-primary">
            <i className="text-lg text-white">
              <FaCheck />
            </i>
          </div>
        ) : (
          // mission.missionType === 'ADDITIONAL' ? (
          //   <div className="mb-[0.175rem] flex h-[2rem] w-[2rem] items-center justify-center">
          //     <i>
          //       <img
          //         src="/icons/additional-contents.svg"
          //         alt="additional contents icon"
          //       />
          //     </i>
          //   </div>
          // ) : mission.missionType === 'REFUND' ? (
          //   <div className="mb-[0.175rem] flex h-[2rem] w-[2rem] items-center justify-center">
          //     <i>
          //       <img src="/icons/refund.svg" alt="refund icon" />
          //     </i>
          //   </div>
          // ) :
          // mission.missionType === 'GENERAL' &&
          <div className="mb-[0.175rem] flex h-[2rem] w-[2rem] items-center justify-center">
            <i>
              <img
                src="/icons/general-mission.svg"
                alt="general mission icon"
              />
            </i>
          </div>
        )}
        <span className="font-pretendard text-xs font-semibold text-primary">
          {mission.th}회차
        </span>
      </Link>
      <div className="mt-2 flex items-center justify-center">
        <span
          className={clsx(
            'rounded-xs px-2 py-[0.125rem] text-xs',
            missionSubmitToBadge({
              status: attendance.status,
              result: attendance.result,
            }).style,
            {
              'opacity-0': attendance.status === 'ABSENT',
            },
          )}
        >
          {
            missionSubmitToBadge({
              status: attendance.status,
              result: attendance.result,
            }).text
          }
        </span>
      </div>
    </>
  );
};

export default MissionTodayIcon;
