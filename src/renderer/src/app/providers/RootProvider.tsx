import { HeroUIProvider } from '@heroui/react';
import { FC, ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import MinecraftProvider from './MinecraftProvider';
import SpecsProvider from './SpecsProvider';
import StoreProvider from './StoreProvider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <HashRouter>
      <StoreProvider>
        <SpecsProvider>
          <MinecraftProvider>
            <HeroUIProvider className="flex flex-grow flex-col">
              {children}
            </HeroUIProvider>
          </MinecraftProvider>
        </SpecsProvider>
      </StoreProvider>
    </HashRouter>
  );
};
