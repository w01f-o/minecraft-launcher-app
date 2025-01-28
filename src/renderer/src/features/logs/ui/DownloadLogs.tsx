import { MainInvokeEvents } from '@/renderer/shared/model';
import { Button } from '@heroui/react';
import log from 'electron-log/renderer';
import { FC, useState } from 'react';

export const DownloadLogs: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clickHandler = async (): Promise<void> => {
    log.info('Downloading logs...');
    setIsLoading(true);

    const { type } = await window.electron.ipcRenderer.invoke(
      MainInvokeEvents.GET_LAUNCHER_LOGS
    );

    switch (type) {
      case 'success':
        log.info('Logs downloaded');
        break;
      case 'error':
        log.error('Error while downloading logs');
        break;
      case 'canceled':
        break;

      default:
        break;
    }

    setIsLoading(false);
  };

  return (
    <Button
      onPress={clickHandler}
      isLoading={isLoading}
      color="primary"
      size="lg"
    >
      Скачать логи
    </Button>
  );
};
