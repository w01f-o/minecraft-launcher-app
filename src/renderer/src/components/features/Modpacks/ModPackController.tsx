import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import Button from '../../shared/UI/Button';
import DownloadIcon from '../../shared/Icons/DownloadIcon';
import ReadyIcon from '../../shared/Icons/ReadyIcon';
import ThrashIcon from '../../shared/Icons/ThrashIcon';
import { useMinecraft } from '../../../hooks/useMinecraft';
import type { ModPack as ModPackType } from '../../../types/entities/ModPack.type';

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
  const { setCurrentModPack, downloadedModPacks, currentModPack } = useMinecraft();

  const selectCurrentClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setCurrentModPack(item);
  };
  const downloadClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setDownloadProgress(0);
    window.minecraft.download({
      id: item.id,
      directoryName: item.directoryName,
      setDownloadProgress,
    });
  };

  const deleteClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  const isDownloadedModPack = useMemo(() => {
    return !!downloadedModPacks.find((m) => m.id === item.id);
  }, [downloadedModPacks]);

  const isCurrentModPack = useMemo(() => {
    return item.id === currentModPack?.id;
  }, [currentModPack, item.id]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-5xl mb-2">
        {item.name}
        {downloadProgress !== null && <div className="text-xl">{downloadProgress}%</div>}
        {!isDownloadedModPack && downloadProgress === null && (
          <Button role={'primary'} rounded onClick={downloadClickHandler}>
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

            <Button role={'primary'} rounded danger onClick={deleteClickHandler}>
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
      <div className="text-2xl mb-2">{item.minecraftVersion}</div>
      <div className="text-xl">{item.description}</div>
    </div>
  );
};

export default ModPackController;
