import { DownloadLogs } from '@/renderer/features/logs';
import { RamSetting, SettingsSwitcher } from '@/renderer/features/settings';
import { useSettings } from '@/renderer/shared/lib';
import { Settings } from '@/renderer/shared/model';
import { Button } from '@heroui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { VladBackground } from './VladBackground';

export const SettingsPage: FC = () => {
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

  const settingsSwitcherList: Settings[] = [
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
      <VladBackground />
      <div className="flex justify-end py-12 flex-grow">
        <div className="flex w-[60%] justify-center flex-col gap-6">
          {settingsSwitcherList.map(setting => (
            <SettingsSwitcher setting={setting} key={setting.id} />
          ))}
          <RamSetting />
          <div className="flex gap-6">
            <DownloadLogs />
            <Button
              as={NavLink}
              to="/"
              draggable={false}
              size="lg"
              className="shadow-md bg-white"
            >
              На главную
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
