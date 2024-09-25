import { FC, useEffect, useState } from 'react';
import loadingLogo from '../../../../../resources/camel-minecraft.gif';
const Loading: FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<number>(0);
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    window.electron.ipcRenderer.on('LAUNCHER_LOADING_PROGRESS', (_e, progress) => {
      setLoadingStatus(Math.round((progress.task / progress.total) * 100));
    });

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center">
      <div>
        <img src={loadingLogo} alt="Loading..." />
      </div>
      <div className="text-2xl font-medium mb-3">Загрузка {dots}</div>
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
