import { FC, useEffect, useMemo, useState } from 'react';
import type { ModPack as ModPackType } from '../../types/entities/ModPack.type';
import clsx from 'clsx';
import { useMinecraft } from '../../hooks/useMinecraft';
import Modal from '../shared/UI/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Button from '../shared/UI/Button';
import DownloadIcon from '../shared/Icons/DownloadIcon';
import ThrashIcon from '../shared/Icons/ThrashIcon';
import ReadyIcon from '../shared/Icons/ReadyIcon';
import CircleLoader from '../shared/UI/DownloadStatus';

interface ModPackProps {
  item: ModPackType;
  isCurrent: boolean;
}

const ModPack: FC<ModPackProps> = ({ item, isCurrent }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const { setCurrentModPack, downloadedModPacks, addDownloadedModPacks } = useMinecraft();

  const selectCurrentClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
    setCurrentModPack(item);
  };

  const modPackClickHandler = (): void => {
    setModalIsOpen(!modalIsOpen);
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

  const isDownloadedModPack = useMemo(() => {
    return !!downloadedModPacks.find((m) => m.id === item.id);
  }, [downloadedModPacks]);

  return (
    <div className="relative active:scale-[.98] transition">
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
          <div>{item.minecraftVersion}</div>
        </div>
        <div className="flex justify-end flex-grow" title={`${downloadProgress}%`}>
          <CircleLoader progress={downloadProgress} />
        </div>
      </button>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        contentClassName="top-[12vh] h-[88vh] translate-y-0"
      >
        <div className="flex flex-col w-full text-white">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            spaceBetween={50}
            className="w-full"
            autoplay={{ delay: 3000, disableOnInteraction: true }}
          >
            {item.screenshots.map((screenshot, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[60vh] overflow-hidden rounded-2xl flex justify-start">
                  <img
                    src={`${import.meta.env.VITE_STATIC_URL}/${screenshot.thumbnail}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col px-6 py-6">
            <div className="flex justify-between">
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
                      {isCurrent && (
                        <div className="grid place-items-center rounded-full bg-green-500 p-1">
                          <ReadyIcon />
                        </div>
                      )}

                      <Button role={'primary'} rounded danger>
                        <ThrashIcon />
                      </Button>

                      {!isCurrent && (
                        <Button role={'primary'} onClick={selectCurrentClickHandler}>
                          Выбрать
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <div className="text-2xl mb-2">{item.minecraftVersion}</div>
                <div className="text-xl">
                  {item.description}
                  {item.description}
                  {item.description}
                  {item.description}
                </div>
              </div>
            </div>
            <div>
              {/*{item.mods.map((mod, index) => (*/}
              {/*  <Mod key={index} item={mod}></Mod>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModPack;
