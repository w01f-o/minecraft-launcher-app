import { Dispatch, FC, SetStateAction } from 'react';
import Modal from '../../shared/UI/Modal';
import type { ModPack as ModPackType } from '../../../types/entities/ModPack.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ModPackController from '../../features/Modpacks/ModPackController';
import ModList from '../Mods/ModList';
import ActualIcon from '../../shared/Icons/ActualIcon';
import Image from '@renderer/components/features/Image';

interface ModPackModalProps {
  item: ModPackType;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  downloadProgress: number | null;
  setDownloadProgress: Dispatch<SetStateAction<number | null>>;
}

const ModPackModal: FC<ModPackModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  item,
  downloadProgress,
  setDownloadProgress,
}) => {
  return (
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
          className="w-full rounded-2xl overflow-hidden"
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
        >
          {item.screenshots.map((screenshot) => (
            <SwiperSlide key={screenshot.id}>
              <Image
                src={`${import.meta.env.VITE_API_URL}/${screenshot.url}`}
                alt={item.name}
                width={'100%'}
                height={'60vh'}
                wrapperClassName="rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-col px-6 py-6">
          <div className="flex flex-col justify-between gap-2">
            <ModPackController
              setModalIsOpen={setModalIsOpen}
              item={item}
              modalIsOpen={modalIsOpen}
              setDownloadProgress={setDownloadProgress}
              downloadProgress={downloadProgress}
            />
            <div className="flex items-center gap-4 mb-2">
              <div className="text-2xl">{item.minecraftVersion}</div>
              {item.isActual && (
                <div className="flex items-center gap-1">
                  <ActualIcon />
                  <p className="text-lg text-red-400 font-medium leading-none">Актуальная</p>
                </div>
              )}
            </div>

            <div className="text-xl">{item.description}</div>
            <ModList mods={item.mods} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModPackModal;
