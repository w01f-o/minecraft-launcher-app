import { useGetCharacterQuery } from '@/renderer/entities/character';
import { useGetModPacksQuery } from '@/renderer/entities/modpack';
import { useMinecraft } from '@/renderer/shared/lib';
import { useDownloadQueue } from '@/renderer/shared/lib/hooks/useDownloadQueue';
import log from 'electron-log/renderer';
import { FC, ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MinecraftProviderProps {
  children: ReactNode;
}

const MinecraftProvider: FC<MinecraftProviderProps> = ({ children }) => {
  const [hwid, setHwid] = useState<string | null>(null);
  const {
    user: { setName },
    modpacks: { download },
  } = useMinecraft();
  const downloadQueue = useDownloadQueue();
  const { data } = useGetCharacterQuery(hwid!, {
    skip: hwid === null,
  });
  const { data: modpacks, isSuccess: modpacksIsSuccess } =
    useGetModPacksQuery();

  useEffect(() => {
    window.utils.getHwid().then(hwid => {
      setHwid(hwid);
      window.localStorage.setItem('hwid', hwid);
    });
  }, []);

  useEffect(() => {
    if (data && data?.username !== null) {
      const { username } = data;

      setName(username);
      log.debug('Username set to:', username);
    }
  }, [data]);

  useEffect(() => {
    if (!modpacksIsSuccess) return;

    let timeout: NodeJS.Timeout;

    window.electron.ipcRenderer.on(
      'MINECRAFT_DOWNLOAD_STARTED',
      (_e, id: string) => {
        const { directoryName, name } = modpacks.find(item => item.id === id)!;

        downloadQueue.set({ directory: directoryName, modpackId: id });
        toast.info(`Началась загрузка сборки ${name}`);
      }
    );

    window.electron.ipcRenderer.on(
      'MINECRAFT_DOWNLOAD_COMPLETED',
      (_e, id: string) => {
        timeout = setTimeout(() => {
          const modpack = modpacks.find(item => item.id === id)!;

          download.add(modpack.id);
          downloadQueue.remove();
          toast.success(`Сборка ${modpack.name} успешно загружена`);
        }, 500);
      }
    );

    window.electron.ipcRenderer.on(
      'MINECRAFT_DOWNLOAD_PROGRESS',
      (_e, { state, id }) => {
        if (id === downloadQueue.item!.modpackId) {
          downloadQueue.update({
            ...downloadQueue.item!,
            downloadStatus: state.percent * 100,
          });
        }
      }
    );

    return (): void => {
      clearTimeout(timeout);
      window.electron.ipcRenderer.removeAllListeners(
        'MINECRAFT_DOWNLOAD_STARTED'
      );
      window.electron.ipcRenderer.removeAllListeners(
        'MINECRAFT_DOWNLOAD_COMPLETED'
      );
      window.electron.ipcRenderer.removeAllListeners(
        'MINECRAFT_DOWNLOAD_PROGRESS'
      );
    };
  }, [modpacks, modpacksIsSuccess, downloadQueue]);

  return children;
};

export default MinecraftProvider;
