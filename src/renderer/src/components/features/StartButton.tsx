import { FC, useState } from 'react';
import Button from '../shared/UI/Button';
import { useSettings } from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { useMinecraft } from '../../hooks/useMinecraft';

const StartButton: FC = () => {
  const { currentModPack, username } = useMinecraft();
  const { isFullscreen, isDebugMode, isLauncherHide, isAutoLogin, maxRam } = useSettings();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const clickHandler = async (): Promise<void> => {
    // setIsLoading(true);

    if (currentModPack) {
      await window.minecraft.start({
        isFullscreen,
        isLauncherHide,
        isDebugMode,
        setIsLoading,
        navigateFunction: navigate,
        clientOptions: {
          directoryName: currentModPack.directoryName,
          gameVersion: currentModPack.minecraftVersion,
          modLoader: currentModPack.modLoader,
          username: username!,
          maxRam: maxRam!,
          modpackId: currentModPack.id,
          javaVersion: currentModPack.javaVersion,
          autoLogin: {
            isAutoLogin,
            serverIp: window.localStorage.getItem('serverIp')!,
          },
        },
      });
    }
  };

  return (
    <Button
      role={'primary'}
      className="self-end w-60 z-20"
      onClick={clickHandler}
      isPending={isLoading || username === null || maxRam === null}
      disabled={currentModPack === null}
    >
      Играть
    </Button>
  );
};

export default StartButton;
