import { DownloadLogs } from '@/renderer/features/logs';
import { MainEvents } from '@/renderer/shared/model';
import { Button } from '@heroui/react';
import { FC } from 'react';
import errorGif from '../../../../../../../resources/sad-azolotl.gif';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = () => {
  const resetSettingsClickHandler = (): void => {
    window.localStorage.clear();
    window.location.reload();
    window.electron.ipcRenderer.send(MainEvents.RESTART_APP);
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center min-w-96">
      <div>
        <img src={errorGif} alt="" />
      </div>
      <div className="text-3xl font-bold">Что-то пошло не так 😔</div>
      <div className="flex gap-4">
        <Button onPress={resetSettingsClickHandler} color="primary" size="lg">
          Сбросить все настройки и перезапустить лаунчер
        </Button>
        <DownloadLogs />
      </div>
      {/*{message && <div>{message}</div>}*/}
    </div>
  );
};
