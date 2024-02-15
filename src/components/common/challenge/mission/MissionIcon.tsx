import clsx from 'clsx';

interface Props {
  className?: string;
  mission: any;
}

const MissionIcon = ({ className, mission }: Props) => {
  return (
    <div
      className={clsx(
        'relative flex aspect-square cursor-pointer flex-col items-center justify-end rounded-md  text-white',
        className,
        {
          'bg-[#d0cfcf]': !mission.attended,
          'bg-[#928DF8]': mission.attended,
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
            'bg-[#c0c0c0]': !mission.attended,
            'bg-primary': mission.attended,
          },
        )}
      />
      {mission.attended ? (
        <i className="mb-1 h-[1.375rem] w-[1.375rem]">
          <img
            src="/icons/check-icon.svg"
            alt="check-icon"
            className="w-full object-cover"
          />
        </i>
      ) : (
        <i className="mb-2 h-[1rem] w-[1rem]">
          <img
            src="/icons/x-icon.svg"
            alt="check-icon"
            className="w-full object-cover"
          />
        </i>
      )}
      <span className="mb-[15%] block font-pretendard text-xs font-semibold">
        {mission.missionTh}일차
      </span>
    </div>
  );
};

export default MissionIcon;