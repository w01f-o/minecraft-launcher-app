import { FC, ReactNode } from 'react'
import Background from '../widgets/Background/Background'
import TitleBar from '../widgets/TitleBar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TitleBar />
      <div className="flex flex-col flex-grow px-14 pt-6 pb-12 relative">
        <h1 className="text-4xl font-medium text-blue_dark mb-6 desktop-height:text-5xl">
          The Chocolate Thief
        </h1>
        {children}
      </div>
      <Background />
    </>
  )
}

export default Layout
