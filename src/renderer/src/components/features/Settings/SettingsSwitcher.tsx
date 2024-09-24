import { FC } from 'react';
import ToggleSwitcher from '../../shared/UI/ToggleSwitcher';
import { Setting } from '../../../types/Setting.type';

interface SettingsSwitcherProps {
  setting: Setting;
}

const SettingsSwitcher: FC<SettingsSwitcherProps> = ({ setting }) => {
  return (
    <div className="flex gap-6 items-center">
      <ToggleSwitcher defaultChecked={setting.defaultValue} onChange={setting.action} />
      <div>
        <div>{setting.name}</div>
        <div>{setting.description}</div>
      </div>
    </div>
  );
};

export default SettingsSwitcher;
