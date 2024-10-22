import { FC, ReactNode, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '@renderer/hooks/useToast';
import log from 'electron-log/renderer';
import { MainEvents } from '@renderer/enums/MainEvents.enum';

interface SpecsProviderProps {
  children: ReactNode;
}

const SpecsProvider: FC<SpecsProviderProps> = ({ children }) => {
  const { setMaxRam, maxRam } = useSettings();

  const toast = useToast();

  useEffect(() => {
    window.electron.ipcRenderer.on(MainEvents.LAUNCHER_UPDATE_AVAILABLE, () => {
      toast.add({ message: 'Доступно обновление, оно будет загружено в фоне', type: 'info' });
    });

    window.electron.ipcRenderer.on(MainEvents.LAUNCHER_UPDATE_DOWNLOADED, () => {
      toast.add({ message: 'Обновление загружено, лаунчер перезапуститься', type: 'success' });
    });

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners(MainEvents.LAUNCHER_UPDATE_AVAILABLE);
      window.electron.ipcRenderer.removeAllListeners(MainEvents.LAUNCHER_UPDATE_DOWNLOADED);
    };
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('unhandled-error', (_e, error) => {
      log.error('Unhandled error in client-console: ', error);
      toast.add({ message: `Произошла ошибка: ${error.message}`, type: 'error' });
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
