import { FC, useState } from 'react';
import Button from '../shared/UI/Button';
import { useSettings } from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';

const StartButton: FC = () => {
  const { isFullscreen, isDebugMode, isLauncherHide, isAutoLogin } = useSettings();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const clickHandler = (): void => {
    setIsLoading(true);

    window.minecraft.start({
      isFullscreen,
      isLauncherHide,
      isAutoLogin,
      isDebugMode,
      setIsLoading,
      navigateFunction: navigate,
    });
  };

  return (
    <Button
      role={'primary'}
      className="self-end w-60 z-20"
      onClick={clickHandler}
      isPending={isLoading}
    >
      Играть
    </Button>
  );
};

export default StartButton;
