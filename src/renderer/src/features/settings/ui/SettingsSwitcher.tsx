import { Settings } from '@/renderer/shared/model';
import { Switch } from '@heroui/react';
import { FC } from 'react';

interface SettingsSwitcherProps {
  setting: Settings;
}

export const SettingsSwitcher: FC<SettingsSwitcherProps> = ({ setting }) => {
  return (
    <div className="flex gap-6 items-center">
      <Switch
        isSelected={setting.value}
        onValueChange={setting.action}
        size="lg"
      />
      <div>
        <div className="text-xl">{setting.name}</div>
        <div>{setting.description}</div>
      </div>
    </div>
  );
};
