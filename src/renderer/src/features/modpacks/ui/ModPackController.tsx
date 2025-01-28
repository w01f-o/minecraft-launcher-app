import { Modpack } from '@/renderer/entities/modpack';
import { useMinecraft } from '@/renderer/shared/lib';
import { useDownloadQueue } from '@/renderer/shared/lib/hooks/useDownloadQueue';
import { MainEvents, MainInvokeEvents } from '@/renderer/shared/model';
import {
  DownloadIcon,
  ReadyIcon,
  TextLoader,
  ThrashIcon,
} from '@/renderer/shared/ui';
import { Button } from '@heroui/react';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { toast } from 'sonner';

interface ModPackControllerProps {
  item: Modpack;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModPackController: FC<ModPackControllerProps> = ({
  item,
  setModalIsOpen,
  modalIsOpen,
}) => {
  const {
    modpacks: {
      current,
      setCurrent,
      download: { remove, list },
    },
  } = useMinecraft();
  const downloadQueue = useDownloadQueue();

  const selectCurrentClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setCurrent(item.id);
  };

  const downloadClickHandler = (): void => {
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
      remove(item.id);

      current === item.id && setCurrent(null);

      toast.success(`Сборка ${item.name} успешно удалена`);
    } else {
      toast.error(`Не удалось удалить сборку ${item.name}`);
    }
  };

  const isDownloadedModPack = useMemo(() => {
    return !!list.find(m => m === item.id);
  }, [list]);

  const isCurrentModPack = item.id === current;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-5xl mb-2">
        {item.name}
        {downloadQueue.item?.modpackId === item.id && (
          <div className="flex text-xl self-end">
            <div className="w-28">
              <TextLoader />
            </div>
            {Math.round(downloadQueue.item.downloadStatus!)}%
          </div>
        )}
        {!isDownloadedModPack && downloadQueue?.item?.modpackId !== item.id && (
          <Button
            onPress={downloadClickHandler}
            isLoading={downloadQueue.item !== null}
            className="rounded-full"
            isIconOnly
            size="lg"
            color="primary"
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
              color="danger"
              onPress={deleteClickHandler}
              isIconOnly
              className="rounded-full"
              size="lg"
            >
              <ThrashIcon />
            </Button>

            {!isCurrentModPack && (
              <Button
                onPress={selectCurrentClickHandler}
                size="lg"
                color="primary"
              >
                Выбрать
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
