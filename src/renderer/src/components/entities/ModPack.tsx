import { FC, useEffect, useState } from 'react';
import type { ModPack as ModPackType } from '../../types/entities/ModPack.type';
import clsx from 'clsx';
import { useMinecraft } from '../../hooks/useMinecraft';
import ModPackModal from '../widgets/Modpacks/ModPackModal';
import ActualIcon from '../shared/Icons/ActualIcon';
import Image from '@renderer/components/features/Image';
import { useToast } from '@renderer/hooks/useToast';
import CircleLoader from '@renderer/components/shared/UI/DownloadStatus';

interface ModPackProps {
  item: ModPackType;
  isCurrent: boolean;
}

const ModPack: FC<ModPackProps> = ({ item, isCurrent }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const { addDownloadedModPacks, setIsDownloading } = useMinecraft();

  const toast = useToast();

  const modPackClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    window.electron.ipcRenderer.on('MINECRAFT_DOWNLOAD_STARTED', (_e, id: string) => {
      if (id === item.id) {
        toast.add({
          type: 'info',
          message: `Началась загрузка сборки ${item.name}`,
        });
      }
    });

    window.electron.ipcRenderer.on('MINECRAFT_DOWNLOAD_COMPLETED', (_e, id: string) => {
      if (id === item.id) {
        timeout = setTimeout(() => {
          addDownloadedModPacks(item);
          setDownloadProgress(null);
          setIsDownloading(false);

          toast.add({
            type: 'success',
            message: `Сборка ${item.name} успешно загружена`,
          });
        }, 1000);
      }
    });

    window.electron.ipcRenderer.on('MINECRAFT_DOWNLOAD_PROGRESS', (_e, { state, id }) => {
      if (id === item.id) {
        setDownloadProgress(state.percent * 100);
      }
    });

    return (): void => {
      clearTimeout(timeout);
      window.electron.ipcRenderer.removeAllListeners('MINECRAFT_DOWNLOAD_STARTED');
      window.electron.ipcRenderer.removeAllListeners('MINECRAFT_DOWNLOAD_COMPLETED');
      window.electron.ipcRenderer.removeAllListeners('MINECRAFT_DOWNLOAD_PROGRESS');
    };
  }, []);

  return (
    <div className="relative active:scale-[.98] transition h-[160px]">
      <button
        className={clsx(
          'flex w-full text-start items-center gap-6 border-4 bg-white rounded-2xl py-4 px-6 h-40 cursor-pointer transition before:absolute before:inset-0 hover:before:bg-black before:opacity-[.05] before:rounded-2xl before:transition',
          {
            'border-white': !isCurrent,
            'border-blue': isCurrent,
          },
        )}
        onClick={modPackClickHandler}
      >
        <Image
          src={`${import.meta.env.VITE_API_URL}/${item.icon}`}
          alt={item.name}
          width={110}
          height={110}
          wrapperClassName="rounded-2xl"
        />
        <div>
          <div className="text-gray">Сборка</div>
          <div className="text-2xl">{item.name}</div>
          <div className="flex items-center gap-2 pt-1">
            <div>{item.minecraftVersion}</div>
            {item.isActual && <ActualIcon />}
          </div>
        </div>
        <div className="flex-grow flex justify-end">
          <CircleLoader progress={downloadProgress} />
        </div>
      </button>
      <ModPackModal
        item={item}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        downloadProgress={downloadProgress}
        setDownloadProgress={setDownloadProgress}
      />
    </div>
  );
};

export default ModPack;
