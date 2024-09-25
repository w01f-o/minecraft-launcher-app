import { FC, useState } from 'react';
import Button from '../shared/UI/Button';
import { useSettings } from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { useMinecraft } from '../../hooks/useMinecraft';

const StartButton: FC = () => {
  const { currentModPack } = useMinecraft();
  const { isFullscreen, isDebugMode, isLauncherHide, isAutoLogin } = useSettings();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const clickHandler = (): void => {
    setIsLoading(true);

    if (currentModPack) {
      window.minecraft.start({
        isFullscreen,
        isLauncherHide,
        isAutoLogin,
        isDebugMode,
        setIsLoading,
        navigateFunction: navigate,
        clientOptions: {
          directoryName: currentModPack.directoryName,
          gameVersion: currentModPack.minecraftVersion,
          modLoader: currentModPack.modLoader,
        },
      });
    }
  };

  return (
    <Button
      role={'primary'}
      className="self-end w-60 z-20"
      onClick={clickHandler}
      isPending={isLoading}
      disabled={currentModPack === null}
    >
      Играть
    </Button>
  );
};

export default StartButton;
