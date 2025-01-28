import { MainEvents } from '@/renderer/shared/model';
import { TextLoader } from '@/renderer/shared/ui';
import { Progress } from '@heroui/react';
import { FC, useEffect, useState } from 'react';
import loadingLogo from '../../../../../../resources/camel-minecraft.gif';

export const LoadingPage: FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<number>(0);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      MainEvents.MINECRAFT_LOADING_PROGRESS,
      (_e, progress): void => {
        setLoadingStatus(Math.round((progress.task / progress.total) * 100));
      }
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners(
        MainEvents.MINECRAFT_LOADING_PROGRESS
      );
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center justify-center select-none">
      <div>
        <img src={loadingLogo} alt="Loading..." draggable={false} />
      </div>
      <div className="text-2xl font-medium mb-4">
        <TextLoader />
      </div>
      <Progress value={loadingStatus} />
    </div>
  );
};
