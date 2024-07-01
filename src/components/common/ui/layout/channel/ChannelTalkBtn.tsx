import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import channelService from '../../../../../ChannelService';

const programDetailPathRegex = /^\/program\/(live|challenge|vod)\/\d+$/; // /program/live/:programId

const ChannelTalkBtn = () => {
  const location = useLocation();

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!window.ChannelIO) {
      channelService.loadScript();
      channelService.boot({
        pluginKey: '3acfb692-c643-456f-86e8-dd64da454947',
        customLauncherSelector: '#custom-channel-button',
        hideChannelButtonOnBoot: true,
      });
      channelService.onShowMessenger(() => setIsHidden(true));
      channelService.onHideMessenger(() => setIsHidden(false));
    }
  }, []);

  return (
    <button
      id="custom-channel-button"
      className={clsx(
        'fixed bottom-20 right-4 flex items-center overflow-hidden rounded-[25rem] shadow-05 sm:bg-neutral-100',
        { hidden: programDetailPathRegex.test(location.pathname) || isHidden },
      )}
    >
      <div className="text-1.125-medium hidden h-[4.25rem] w-28 items-center justify-center sm:flex">
        문의하기
      </div>
      <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-primary">
        <img
          className="h-8 w-8"
          src="/icons/channel.png"
          alt="렛츠커리어 채널톡 로고"
        />
      </div>
    </button>
  );
};

export default ChannelTalkBtn;
