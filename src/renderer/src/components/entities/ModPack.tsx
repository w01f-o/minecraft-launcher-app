import { FC, useEffect, useState } from 'react';
import type { ModPack as ModPackType } from '../../types/entities/ModPack.type';
import clsx from 'clsx';
import { useMinecraft } from '../../hooks/useMinecraft';
import CircleLoader from '../shared/UI/DownloadStatus';
import ModPackModal from '../widgets/Modpacks/ModPackModal';
import ActualIcon from '../shared/Icons/ActualIcon';

interface ModPackProps {
  item: ModPackType;
  isCurrent: boolean;
}

const ModPack: FC<ModPackProps> = ({ item, isCurrent }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const { addDownloadedModPacks } = useMinecraft();

  const modPackClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (downloadProgress === 100) {
      timeout = setTimeout(() => {
        addDownloadedModPacks(item);
        setDownloadProgress(null);
      }, 1000);
    }

    return (): void => {
      if (timeout) clearTimeout(timeout);
    };
  }, [downloadProgress]);

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
        <div className="w-[110px] h-[110px] overflow-hidden rounded-2xl">
          <img
            src={`${import.meta.env.VITE_STATIC_URL}/${item.thumbnail}`}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-gray">Сборка</div>
          <div className="text-2xl">{item.name}</div>
          <div className="flex items-center gap-2 pt-1">
            <div>{item.minecraftVersion}</div>
            {item.isActual && <ActualIcon />}
          </div>
        </div>
        <div className="flex justify-end flex-grow" title={`${downloadProgress}%`}>
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
