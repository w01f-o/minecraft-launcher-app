import { MainEvents } from '@/renderer/shared/model';
import log from 'electron-log/renderer';
import { FC, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { useSettings } from '../../shared/lib/hooks/useSettings';

interface SpecsProviderProps {
  children: ReactNode;
}

const SpecsProvider: FC<SpecsProviderProps> = ({ children }) => {
  const { setMaxRam, maxRam } = useSettings();

  useEffect(() => {
    window.electron.ipcRenderer.on(MainEvents.LAUNCHER_UPDATE_AVAILABLE, () => {
      toast.info('Доступно обновление, оно будет загружено в фоновом режиме');
    });

    window.electron.ipcRenderer.on(
      MainEvents.LAUNCHER_UPDATE_DOWNLOADED,
      () => {
        toast.success('Обновление загружено, лаунчер перезапуститься');
      }
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners(
        MainEvents.LAUNCHER_UPDATE_AVAILABLE
      );
      window.electron.ipcRenderer.removeAllListeners(
        MainEvents.LAUNCHER_UPDATE_DOWNLOADED
      );
    };
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('unhandled-error', (_e, error) => {
      log.error('Unhandled error in client-console: ', error);
      toast.error(`Произошла ошибка: ${error.message}`);
    });

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('unhandled-error');
    };
  }, []);

  useEffect(() => {
    if (maxRam === null) {
      const totalRam = window.utils.getMemory();
      window.localStorage.setItem('totalRam', totalRam.toString());
      setMaxRam(Math.round(totalRam * 0.7));
    }
  }, []);

  return children;
};

export default SpecsProvider;
