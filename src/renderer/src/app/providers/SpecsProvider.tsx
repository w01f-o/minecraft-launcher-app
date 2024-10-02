import { FC, ReactNode, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '@renderer/hooks/useToast';
import log from 'electron-log/renderer';

interface SpecsProviderProps {
  children: ReactNode;
}

const SpecsProvider: FC<SpecsProviderProps> = ({ children }) => {
  const { setMaxRam, maxRam } = useSettings();

  const toast = useToast();

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
