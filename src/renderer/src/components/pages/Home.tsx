import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import SettingsIcon from '../shared/Icons/SettingsIcon'
import ModPackList from '../widgets/Modpack/ModpackList'
import stasBg from '../../../../../resources/stasbg.webp'
import StartButton from '../features/StartButton'

const Home: FC = () => {
  useEffect(() => {
    document.title = 'The Chocolate Thief'
  }, [])

  return (
    <>
      <div className="flex h-full flex-grow justify-between items-center">
        <div className="overflow-y-auto w-1/2 max-h-[70vh] scrollbar-none">
          <ModPackList />
        </div>
        <div className="flex items-center gap-4 self-end z-20">
          <StartButton />
          <NavLink
            to={'/settings'}
            className="active:scale-95 animate-spin-slow"
            title={'Настройки'}
          >
            <SettingsIcon />
          </NavLink>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 z-10">
        <img src={stasBg} alt="" />
      </div>
    </>
  )
}

export default Home
