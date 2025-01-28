import { Modpack } from '@/renderer/entities/modpack';
import { useDownloadQueue } from '@/renderer/shared/lib/hooks/useDownloadQueue';
import { ActualIcon } from '@/renderer/shared/ui';
import { CircularProgress, Image, Tooltip, useDisclosure } from '@heroui/react';
import clsx from 'clsx';
import { FC } from 'react';
import { ModPackModal } from './ModPackModal';

interface ModpackItemProps {
  item: Modpack;
  isCurrent: boolean;
}

export const ModpackItem: FC<ModpackItemProps> = ({ item, isCurrent }) => {
  const { onOpenChange, isOpen } = useDisclosure();

  const downloadQueue = useDownloadQueue();

  const modPackClickHandler = (): void => {
    onOpenChange();
  };

  return (
    <div className="relative active:scale-[.98] transition h-[160px]">
      <button
        className={clsx(
          'flex w-full text-start items-center gap-6 border-4 shadow-md bg-white rounded-2xl py-4 px-6 h-40 cursor-pointer transition before:absolute before:inset-0 hover:before:bg-black before:opacity-[.05] before:rounded-2xl before:transition',
          {
            'border-white': !isCurrent,
            'border-blue': isCurrent,
          }
        )}
        onClick={modPackClickHandler}
      >
        <Image
          src={`${import.meta.env.VITE_API_URL}/${item.icon}`}
          alt={item.name}
          width={110}
          height={110}
          classNames={{ wrapper: 'rounded-2xl' }}
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
          {downloadQueue.item?.modpackId === item.id && (
            <Tooltip
              content={`${Math.round(downloadQueue.item.downloadStatus)}%`}
            >
              <CircularProgress
                aria-label="Loading..."
                color="primary"
                value={downloadQueue.item.downloadStatus}
              />
            </Tooltip>
          )}
        </div>
      </button>
      <ModPackModal item={item} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
