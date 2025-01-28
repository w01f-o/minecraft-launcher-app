import { FC, useState } from 'react';
import Button from '@renderer/components/shared/UI/Button';
import log from 'electron-log/renderer';
import { MainInvokeEvents } from '@renderer/enums/MainInvokeEvents.enum';

const DownloadLogs: FC = () => {
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
      role={'primary'}
      onClick={clickHandler}
      isPending={isLoading}
      className="w-full"
    >
      Скачать логи
    </Button>
  );
};

export default DownloadLogs;
