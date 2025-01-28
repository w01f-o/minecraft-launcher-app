import { useGetModPacksQuery } from '@/renderer/entities/modpack';
import { useMinecraft, useSettings } from '@/renderer/shared/lib';
import { Button } from '@heroui/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StartButton: FC = () => {
  const {
    modpacks: { current },
    user: { name },
  } = useMinecraft();
  const { isFullscreen, isDebugMode, isLauncherHide, isAutoLogin, maxRam } =
    useSettings();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isSuccess, data: modpacks } = useGetModPacksQuery();
  const navigate = useNavigate();

  const clickHandler = async (): Promise<void> => {
    setIsLoading(true);

    if (current && isSuccess) {
      const { directoryName, minecraftVersion, id, javaVersion, modLoader } =
        modpacks.find(modpack => modpack.id === current)!;

      await window.minecraft.start({
        isFullscreen,
        isLauncherHide,
        isDebugMode,
        setIsLoading,
        navigateFunction: navigate,
        clientOptions: {
          directoryName: directoryName,
          gameVersion: minecraftVersion,
          modLoader: modLoader,
          username: name!,
          maxRam: Number(maxRam),
          modpackId: id,
          javaVersion: javaVersion,
          autoLogin: {
            isAutoLogin,
            serverIp: import.meta.env.VITE_MINECRAFT_SERVER_IP,
          },
        },
      });
    }
  };

  const isDisabled =
    isLoading || name === null || maxRam === null || !isSuccess;

  return (
    <Button
      size="lg"
      className="w-[240px] font-semibold text-lg"
      onPress={clickHandler}
      color="primary"
      isLoading={isDisabled}
      isDisabled={isDisabled}
    >
      Играть
    </Button>
  );
};
