import { Dispatch, FC, SetStateAction } from 'react';
import Modal from '../../shared/UI/Modal';
import type { ModPack as ModPackType } from '../../../types/entities/ModPack.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Screenshot from '../../entities/Screenshot';
import ModPackController from '../../features/Modpacks/ModPackController';
import ModList from '../Mods/ModList';
import ActualIcon from '../../shared/Icons/ActualIcon';

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
          className="w-full"
          autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
        >
          {item.screenshots.map((screenshot) => (
            <SwiperSlide key={screenshot.id}>
              <Screenshot item={screenshot} name={item.name} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-col px-6 py-6">
          <div className="flex flex-col justify-between">
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
                  <p className="text-lg">Актуальная</p>
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
