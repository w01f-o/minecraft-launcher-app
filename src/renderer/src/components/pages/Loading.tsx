import { FC, useEffect, useState } from 'react';
import loadingLogo from '../../../../../resources/camel-minecraft.gif';
import TextLoader from '@renderer/components/widgets/Loaders/TextLoader';
import { MainEvents } from '@renderer/enums/MainEventsEnum';

const Loading: FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.on(MainEvents.MINECRAFT_LOADING_PROGRESS, (_e, progress): void => {
      setLoadingStatus(Math.round((progress.task / progress.total) * 100));
    });

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners(MainEvents.MINECRAFT_LOADING_PROGRESS);
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <div>
        <img src={loadingLogo} alt="Loading..." />
      </div>
      <div className="text-2xl font-medium mb-3">
        <TextLoader />
      </div>
      <div className="w-full h-3 bg-white rounded-2xl border border-blue_light">
        <div
          className="h-3 bg-blue rounded-2xl transition-all duration-500"
          style={{ width: `${loadingStatus}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
