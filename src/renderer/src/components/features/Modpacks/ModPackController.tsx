import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import Button from '../../shared/UI/Button';
import DownloadIcon from '../../shared/Icons/DownloadIcon';
import ReadyIcon from '../../shared/Icons/ReadyIcon';
import ThrashIcon from '../../shared/Icons/ThrashIcon';
import { useMinecraft } from '../../../hooks/useMinecraft';
import type { ModPack as ModPackType } from '../../../types/entities/ModPack.type';
import { useToast } from '@renderer/hooks/useToast';
import TextLoader from '@renderer/components/widgets/Loaders/TextLoader';
import { MainEvents } from '@renderer/enums/MainEvents.enum';
import { MainInvokeEvents } from '@renderer/enums/MainInvokeEvents.enum';

interface ModPackControllerProps {
  item: ModPackType;
  downloadProgress: number | null;
  setDownloadProgress: Dispatch<SetStateAction<number | null>>;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModPackController: FC<ModPackControllerProps> = ({
  item,
  setDownloadProgress,
  downloadProgress,
  setModalIsOpen,
  modalIsOpen,
}) => {
  const {
    setCurrentModPack,
    downloadedModPacks,
    currentModPack,
    removeDownloadedModPacks,
    setIsDownloading,
    isDownloading,
  } = useMinecraft();

  const toast = useToast();

  const selectCurrentClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setCurrentModPack(item);
  };

  const downloadClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setDownloadProgress(0);
    setIsDownloading(true);

    window.electron.ipcRenderer.send(MainEvents.DOWNLOAD_MODPACK, {
      id: item.id,
      directoryName: item.directoryName,
    });
  };

  const deleteClickHandler = async (): Promise<void> => {
    setModalIsOpen(!modalIsOpen);
    const result = await window.electron.ipcRenderer.invoke(
      MainInvokeEvents.DELETE_MODPACK,
      item.directoryName
    );

    if (result.isSuccess) {
      removeDownloadedModPacks(item);

      currentModPack?.id === item.id && setCurrentModPack(null);

      toast.add({
        type: 'success',
        message: `Сборка ${item.name} успешно удалена`,
      });
    } else {
      toast.add({
        type: 'error',
        message: `Не удалось удалить сборку ${item.name}`,
      });
    }
  };

  const isDownloadedModPack = useMemo(() => {
    return !!downloadedModPacks.find(m => m.id === item.id);
  }, [downloadedModPacks]);

  const isCurrentModPack = useMemo(() => {
    return item.id === currentModPack?.id;
  }, [currentModPack, item.id]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-5xl mb-2">
        {item.name}
        {downloadProgress !== null && (
          <div className="flex text-xl self-end">
            <div className="w-28">
              <TextLoader />
            </div>
            {Math.round(downloadProgress)}%
          </div>
        )}
        {!isDownloadedModPack && downloadProgress === null && (
          <Button
            role={'primary'}
            rounded
            onClick={downloadClickHandler}
            isPending={isDownloading}
          >
            <DownloadIcon />
          </Button>
        )}

        {isDownloadedModPack && (
          <>
            {isCurrentModPack && (
              <div className="grid place-items-center rounded-full bg-green-500 p-1">
                <ReadyIcon />
              </div>
            )}

            <Button
              role={'primary'}
              rounded
              danger
              onClick={deleteClickHandler}
            >
              <ThrashIcon />
            </Button>

            {!isCurrentModPack && (
              <Button role={'primary'} onClick={selectCurrentClickHandler}>
                Выбрать
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModPackController;
