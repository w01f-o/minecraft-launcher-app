import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Setting } from '../../types/Setting.type';
import SettingsSwitcher from '../features/Settings/SettingsSwitcher';
import { useSettings } from '../../hooks/useSettings';
import RamSetting from '../features/Settings/RamSetting';
import Button from '../shared/UI/Button';
import VladBackGround from '../widgets/Background/VladBackGround';
import DownloadLogs from '@renderer/components/features/DownloadLogs';

const Settings: FC = () => {
  useEffect(() => {
    document.title = 'The Chocolate Thief - Настройки';
  }, []);

  const {
    toggleAutoLogin,
    toggleDebugMode,
    toggleFullScreen,
    isAutoLogin,
    isDebugMode,
    isFullscreen,
    isLauncherHide,
    toggleLauncherHide,
  } = useSettings();

  const settingsSwitcherList: Setting[] = [
    {
      id: 1,
      name: 'Debug - режим',
      description: 'Включить режим отладки при запуске игрового клиента',
      value: isDebugMode,
      action: toggleDebugMode,
    },
    {
      id: 2,
      name: 'Полноэкранный режим',
      description: 'Включить полноэкранный режим в Minecraft',
      value: isFullscreen,
      action: toggleFullScreen,
    },
    {
      id: 3,
      name: 'Скрывать лаунчер',
      description: 'Скрывать лаунчер при запуске игры',
      value: isLauncherHide,
      action: toggleLauncherHide,
    },
    {
      id: 4,
      name: 'Автоматический вход на сервер',
      description: 'Включить автоматический вход на сервер при запуске',
      value: isAutoLogin,
      action: toggleAutoLogin,
    },
  ];

  return (
    <>
      <VladBackGround />
      <div className="flex justify-end py-12 flex-grow">
        <div className="flex w-[60%] justify-center flex-col gap-6">
          {settingsSwitcherList.map(setting => (
            <SettingsSwitcher setting={setting} key={setting.id} />
          ))}
          <RamSetting />
          <div className="flex gap-6">
            <div className="w-[250px]">
              <DownloadLogs />
            </div>
            <NavLink to={'/'} className="self-start" draggable={false}>
              <Button role={'secondary'}>На главную</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
