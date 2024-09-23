import { FC, ReactNode } from 'react'
import StoreProvider from './StoreProvider'
import { HashRouter } from 'react-router-dom'
import SpecsProvider from './SpecsProvider'

interface RootProviderProps {
  children: ReactNode
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <HashRouter>
      <StoreProvider>
        <SpecsProvider>{children}</SpecsProvider>
      </StoreProvider>
    </HashRouter>
  )
}

export default RootProvider
