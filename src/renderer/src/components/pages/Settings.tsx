import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import vladBg from '../../../../../resources/vladbg.webp'
import { Setting } from '../../types/Setting.type'
import SettingsSwitcher from '../features/Settings/SettingsSwitcher'
import { useSettings } from '../../hooks/useSettings'
import RamSetting from '../features/Settings/RamSetting'
import Button from '../shared/UI/Button'

const Settings: FC = () => {
  const {
    toggleAutoLogin,
    toggleDebugMode,
    toggleFullScreen,
    isAutoLogin,
    isDebugMode,
    isFullscreen
  } = useSettings()

  const settingsSwitcherList: Setting[] = [
    {
      id: 1,
      name: 'Debug - режим',
      description: 'Включить режим отладки при запуске игрового клиента',
      defaultValue: isDebugMode,
      action: toggleDebugMode
    },
    {
      id: 2,
      name: 'Полноэкранный режим',
      description: 'Включить полноэкранный режим в Minecraft',
      defaultValue: isFullscreen,
      action: toggleFullScreen
    },
    {
      id: 3,
      name: 'Автоматический вход на сервер',
      description: 'Включить автоматический вход на сервер при запуске',
      defaultValue: isAutoLogin,
      action: toggleAutoLogin
    }
  ]

  return (
    <>
      <div className="absolute -left-10 -bottom-10">
        <img src={vladBg} alt="" />
      </div>
      <div className="flex justify-end py-12 flex-grow">
        <div className="flex w-[60%] justify-center flex-col gap-6">
          {settingsSwitcherList.map((setting) => (
            <SettingsSwitcher setting={setting} key={setting.id} />
          ))}
          <RamSetting />
          <NavLink to={'/'}>
            <Button role={'secondary'}>На главную</Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Settings
