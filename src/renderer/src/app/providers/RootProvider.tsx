import { FC, ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { HashRouter } from 'react-router-dom';
import SpecsProvider from './SpecsProvider';
import MinecraftProvider from './MinecraftProvider';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <HashRouter>
      <StoreProvider>
        <SpecsProvider>
          <MinecraftProvider>{children}</MinecraftProvider>
        </SpecsProvider>
      </StoreProvider>
    </HashRouter>
  );
};

export default RootProvider;
