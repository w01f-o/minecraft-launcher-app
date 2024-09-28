import { FC, ReactNode, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';

interface SpecsProviderProps {
  children: ReactNode;
}

const SpecsProvider: FC<SpecsProviderProps> = ({ children }) => {
  const { setMaxRam, maxRam } = useSettings();

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
